import 'package:admin/constants.dart';
import 'package:admin/controllers/MenuAppController.dart';
import 'package:admin/screens/main/main_screen.dart';
import 'package:admin/screens/sign/sign_screen.dart';
import 'package:admin/services/http.dart';
import 'package:admin/stores/auth.store.dart';
import 'package:admin/stores/dashboard.store.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

void main() async {
  try {
    await dotenv.load(fileName: ".env");
  } catch (e) {
    debugPrint(e.toString());
  }
  await WidgetsFlutterBinding.ensureInitialized();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    AuthStore authStore = AuthStore();

    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (context) => MenuAppController(),
        ),
        ChangeNotifierProvider(
          create: (context) => authStore,
        ),
        ChangeNotifierProvider(create: (context) => DashboardStore()),
        Provider<Dio>(
          create: (_) => initializeRest(),
        )
      ],
      child: MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Lunar',
          theme: ThemeData.dark().copyWith(
            scaffoldBackgroundColor: bgColor,
            textTheme: GoogleFonts.poppinsTextTheme(Theme.of(context).textTheme)
                .apply(bodyColor: Colors.white),
            canvasColor: secondaryColor,
          ),
          initialRoute: authStore.accessToken == null ? "/sign" : "/dashboard",
          routes: {
            '/sign': (context) => SignScreen(),
            "/dashboard": (context) => MainScreen()
          }),
    );
  }
}
