class User {
    constructor(username, password, groupId) {
      this._username = username; 
      this._password = password;
      this._groupId = groupId; 
    }
  
    get username() {
      return this._username;
    }
  
    set username(newUsername) {
      this._username = newUsername;
    }
  
    get password() {
      return this._password;
    }
  
    set password(newPassword) {
      this._password = newPassword;
    }
  
    get groupId() {
      return this._groupId;
    }
  
    set groupId(newGroupId) {
      this._groupId = newGroupId;
    }

    checkPassword(password) {
      return this._password === password;
    }

    toString() {
      return `User(username: ${this._username}, groupId: ${this._groupId})`;
    }

    static fromDatabaseRow(row) {
      return new User(row.username, row.password, row.groupId);
    }
  }

module.exports= User;
  