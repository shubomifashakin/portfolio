import * as airtable from "airtable";
import { timeOut } from "./timeout";

class auth {
  clientID = import.meta.env.VITE_CLIENT_ID;
  SPOTIFY_ID = import.meta.env.VITE_SPOTIFY_ID;
  clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  refreshToken = import.meta.env.VITE_REFRESH_TOKEN;

  airtableId = import.meta.env.VITE_AIRTABLE_ID;
  airtableKey = import.meta.env.VITE_AIRTABLE_KEY;

  redirect_uri = import.meta.env.VITE_REDIRECT_URL;
  url = "https://accounts.spotify.com/api/token";

  base;
  token;

  constructor() {
    //configure airtable to allow access to airtable
    airtable.configure({
      apiKey: this.airtableKey,
      endpointUrl: "https://api.airtable.com",
    });

    //link airtable to our base
    this.base = airtable.base(this.airtableId);
  }

  async getToken() {
    let authString64 = btoa(`${this.clientID}:${this.clientSecret}`);

    //required post headers
    let header = new Headers();
    header.append("Authorization", `Basic ${authString64}`);
    header.append("Content-Type", "application/x-www-form-urlencoded");

    //required post body
    let bodyData = new URLSearchParams();
    bodyData.append("refresh_token", this.refreshToken);
    bodyData.append("grant_type", "refresh_token");

    try {
      const request = await Promise.race([
        fetch(this.url, {
          method: "POST",
          body: bodyData,
          headers: header,
        }),
        timeOut(),
      ]);

      if (!request.ok) {
        throw new Error(`An error occurred ${request.status}`);
      }

      const response = await request.json();

      //sets the initial access token
      this.token = response.access_token;

      //update our airtable
      this.updateAirtable(response);

      return response.access_token;
    } catch (err) {
      throw err;
    }
  }

  async updateAirtable(response) {
    //update our airtable fields
    await this.base("spotData").update([
      {
        id: "recWBanJS64gcwbvL",
        fields: {
          TOKEN: `${response.access_token}`,
          TIME: `${response.expires_in}`,
          CREATED: `${new Date()}`,
        },
      },
    ]);
  }
}

export const authVars = new auth();
