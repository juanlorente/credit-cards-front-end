export default class Utils {
  static capitalizeFirstChar(stringValue) {
    return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
  }
}