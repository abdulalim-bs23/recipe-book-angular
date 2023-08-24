export class User {
  constructor(
    public email?: string,
    public id?: string,
    private _token?: string,
    private _tokenExpirationTime?: Date
  ) {}

  get token() {
    if (!this._tokenExpirationTime || this._tokenExpirationTime < new Date()) {
      return null;
    }
    return this._token;
  }
}
