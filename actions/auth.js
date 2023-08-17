import * as airtable from "airtable";
class auth {
  clientID = import.meta.env.VITE_CLIENT_ID;
  SPOTIFY_ID = import.meta.env.VITE_SPOTIFY_ID;
  clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  // console.log(clientSecret);

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
    //get the code from our url and append our code and secrets to the url
    const code = new URLSearchParams(window.location.search).get("code");
    const data = new URLSearchParams();
    data.append("client_id", this.clientID);
    data.append("client_secret", this.clientSecret);
    data.append("grant_type", "authorization_code");
    data.append("code", code);
    data.append("redirect_uri", this.redirect_uri);
    try {
      const request = await fetch(this.url, {
        method: "POST",
        body: data,
      });

      if (!request.ok) {
        throw new Error(`An error occurred ${error.status}`);
      }

      const response = await request.json();

      //sets the initial access token
      this.token = response.access_token;

      //update our airtable fields
      await this.base("spotData").update([
        {
          id: "recWBanJS64gcwbvL",
          fields: {
            TOKEN: `${response.refresh_token}`,
            TIME: `${response.expires_in}`,
            CREATED: `${new Date()}`,
          },
        },
      ]);

      return response.access_token;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export const authVars = new auth();
