import 'package:admin/models/scan.model.dart';
import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';

part 'dashboard.store.g.dart';

class DashboardStore = _DashboardStore with _$DashboardStore;

abstract class _DashboardStore with Store, ChangeNotifier {
  @observable
  List<Scan> scansData = [];

  @action
  void setScansData(List<Scan> scans) {
    scansData = scans;
    notifyListeners();
  }
}
