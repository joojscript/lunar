import 'package:admin/models/scan.model.dart';
import 'package:admin/responsive.dart';
import 'package:admin/screens/dashboard/components/my_fields.dart';
import 'package:admin/stores/dashboard.store.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../constants.dart';
import 'components/header.dart';
import 'components/recent_files.dart';
import 'components/storage_details.dart';

class DashboardScreen extends StatefulWidget {
  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  Future<List<Scan>?> fetchData(BuildContext context) async {
    Dio httpService = Provider.of<Dio>(context);
    DashboardStore dashboardStore = Provider.of<DashboardStore>(context);

    var result = await httpService.get<List<Scan>>("/scans/latest");
    debugPrint(result.data.toString());
    return null;

    // dashboardStore.setScansData(result.data!);
    // return result.data;
  }

  @override
  Widget build(BuildContext context) {
    DashboardStore dashboardStore =
        Provider.of<DashboardStore>(context, listen: true);
    List<Scan> scansData = dashboardStore.scansData;

    return SafeArea(
      child: SingleChildScrollView(
        primary: false,
        padding: EdgeInsets.all(defaultPadding),
        child: FutureBuilder(
          future: fetchData(context),
          builder: (context, _snapshot) {
            if (scansData.isEmpty) {
              return Center(child: CircularProgressIndicator());
            }

            return Column(
              children: [
                Header(),
                SizedBox(height: defaultPadding),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      flex: 5,
                      child: Column(
                        children: [
                          MyFiles(),
                          SizedBox(height: defaultPadding),
                          RecentFiles(),
                          if (Responsive.isMobile(context))
                            SizedBox(height: defaultPadding),
                          if (Responsive.isMobile(context)) StorageDetails(),
                        ],
                      ),
                    ),
                    if (!Responsive.isMobile(context))
                      SizedBox(width: defaultPadding),
                    // On Mobile means if the screen is less than 850 we don't want to show it
                    if (!Responsive.isMobile(context))
                      Expanded(
                        flex: 2,
                        child: StorageDetails(),
                      ),
                  ],
                )
              ],
            );
          },
        ),
      ),
    );
  }
}
