import 'package:shared_preferences/shared_preferences.dart';

class Storage {
  Storage._();

  static final instance = Storage._();

  void set(dynamic key, dynamic value) {
    SharedPreferences.getInstance().then((sp) {
      if (value is String) {
        sp.setString(key, value);
      }
      if (value is List<String>) {
        sp.setStringList(key, value);
      }
      if (value is bool) {
        sp.setBool(key, value);
      }
      if (value is int) {
        sp.setInt(key, value);
      }
      if (value is double) {
        sp.setDouble(key, value);
      }
    });
  }

  void remove(dynamic key) async {
    SharedPreferences sp = await SharedPreferences.getInstance();
    sp.remove(key);
  }

  Future<dynamic> get(dynamic key) async {
    SharedPreferences sp = await SharedPreferences.getInstance();
    return sp.get(key);
  }

  dynamic getSync(dynamic key) {
    SharedPreferences.getInstance().then((sp) {
      sp.get(key);
    });
  }
}
