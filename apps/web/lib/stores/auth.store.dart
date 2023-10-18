import 'package:admin/services/storage.dart';
import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';

part 'auth.store.g.dart';

class AuthStore = _AuthStore with _$AuthStore;

const accessTokenStorageKey = 'accessToken';

abstract class _AuthStore with Store, ChangeNotifier {
  @observable
  String? accessToken;

  _AuthStore() {
    fetchPreExistingData();
  }

  void fetchPreExistingData() async {
    Storage.instance.get(accessTokenStorageKey).then((token) {
      accessToken = token;
      notifyListeners();
    });
  }

  @action
  void setAccessToken(String token) {
    Storage.instance.set(accessTokenStorageKey, token);
    accessToken = token;
    notifyListeners();
  }
}
