class User {
    constructor(username, password) {
        this._username = username; 
        this._password = password;
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

    checkPassword(password) {
        return this._password === password;
    }

    toString() {
        return `User(username: ${this._username})`;
    }
}

