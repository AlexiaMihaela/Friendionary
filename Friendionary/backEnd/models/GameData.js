class GameData {
    constructor(id, name, description, groupId) {
      this._id = id;
      this._name = name;
      this._description = description;
      this._groupId = groupId;
    }
  
    get id() {
      return this._id;
    }
  
    set id(newId) {
      this._id = newId;
    }

    get name() {
      return this._name;
    }
  
    set name(newName) {
      this._name = newName;
    }
  
    get description() {
      return this._description;
    }
  
    set description(newDescription) {
      this._description = newDescription;
    }

    get groupId() {
      return this._groupId;
    }
  
    set groupId(newGroupId) {
      this._groupId = newGroupId;
    }

    toString() {
      return `GameData(id: ${this._id}, name: ${this._name}, description: ${this._description}, groupId: ${this._groupId})`;
    }

    static fromDatabaseRow(row) {
      return new GameData(row.id, row.user, row.description, row.groupId);
    }
  }
  
  module.exports= GameData;