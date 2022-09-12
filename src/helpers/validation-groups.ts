export default class ValidationGroups {
  public static readonly CREATE = 'create';

  public static readonly READ = 'read';

  public static readonly UPDATE = 'update';

  public static all() {
    return [this.CREATE, this.READ, this.UPDATE];
  }
}
