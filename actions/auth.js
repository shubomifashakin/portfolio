import * as airtable from "airtable";
class auth {
  clientID = import.meta.env.VITE_CLIENT_ID;
  SPOTIFY_ID = import.meta.env.VITE_SPOTIFY_ID;
  clientSecret = import.meta.env.VITE_CLIENT_SECRET;

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
    //PREVIOUS JAVASCRIPT CODE USING SPOTIFY AUTHORIZATION FLOW TO ACCESS currently playing (uncomment to use)

    /** 
    // //get the code from our url and append our code and secrets to the url

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

    **/

    //if you want to use previous code, comment out from HERE
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");

    let authString64 = btoa(`${this.clientID}:${this.clientSecret}`);

    let header = new Headers();
    header.append("Authorization", `Basic ${authString64}`);
    header.append("Content-Type", "application/x-www-form-urlencoded");

    try {
      const request = await fetch(this.url, {
        method: "POST",
        headers: header,
        body: data.toString(),
      });

      if (!request.ok) {
        throw new Error(`An error occurred ${error.status}`);
      }
      //to HERE

      const response = await request.json();

      //sets the initial access token
      this.token = response.access_token;

      /** Also uncomment HERE

      //update our airtable
       this.updateAirtable(response);

      **/

      return response.access_token;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateAirtable(response) {
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
  }
}

export const authVars = new auth();
