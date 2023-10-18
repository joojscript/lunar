import 'package:admin/responsive.dart';
import 'package:admin/stores/auth.store.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:form_validator/form_validator.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:otp_text_field/otp_field.dart';
import 'package:otp_text_field/style.dart';
import 'package:provider/provider.dart';

class SignScreen extends StatefulWidget {
  const SignScreen({Key? key}) : super(key: key);

  @override
  State<SignScreen> createState() => _SignScreenState();
}

class _SignScreenState extends State<SignScreen> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final TextEditingController _emailController =
      TextEditingController(text: "joaoaugustoperin@gmail.com");

  bool _showOtpCode = false;

  void handleSubmitEmail(BuildContext context) async {
    Dio httpService = Provider.of<Dio>(context, listen: false);

    if (_formKey.currentState!.validate()) {
      try {
        var result = await httpService.post("/auth/login_attempt",
            data: {"email": _emailController.value.text});

        if (result.statusCode == 201) {
          setState(() {
            _showOtpCode = true;
          });
        }
      } catch (e) {
        debugPrint(e.toString());
        MotionToast.error(
          description: Text(
              "Something went wrong with your request, please try again later"),
          title: Text("Error"),
        ).show(context);
      }
    }
  }

  void handleSubmitOtp(BuildContext context, String otpCode) async {
    Dio httpService = Provider.of<Dio>(context, listen: false);
    AuthStore authStore = Provider.of<AuthStore>(context, listen: false);
    NavigatorState navigator = Navigator.of(context);

    try {
      var result = await httpService.post("/auth/verify_otp_code",
          data: {"email": _emailController.value.text, "otp_code": otpCode});

      String? accessToken = result.data["access_token"];
      if (accessToken == null) throw "Invalid access token";

      authStore.setAccessToken(accessToken);
      httpService.options.headers
          .addAll({"Authorization": "Bearer $accessToken"});
      navigator.popAndPushNamed("/dashboard");
    } catch (e) {
      debugPrint(e.toString());
      MotionToast.error(
        description: Text(
            "Something went wrong with your request, please try again later"),
        title: Text("Error"),
      ).show(context);
    }
  }

  List<Widget> formElements(BuildContext context) {
    if (_showOtpCode) {
      return new List.from([
        OTPTextField(
          length: 4,
          width: MediaQuery.of(context).size.width,
          fieldWidth: 80,
          style: TextStyle(fontSize: 17),
          textFieldAlignment: MainAxisAlignment.spaceAround,
          fieldStyle: FieldStyle.underline,
          onCompleted: (code) {
            handleSubmitOtp(context, code);
          },
        ),
      ]);
    } else {
      return new List.from([
        TextFormField(
          controller: _emailController,
          validator: ValidationBuilder().email().build(),
          decoration: InputDecoration(hintText: "Email"),
        ),
        ElevatedButton(
            onPressed: () => handleSubmitEmail(context), child: Text("Submit")),
      ]);
    }
  }

  Widget form(BuildContext context) {
    return Form(
      key: _formKey,
      child: SizedBox(
        width:
            Responsive(mobile: 500, desktop: 550).toRawValue<double>(context),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: this.formElements(context),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    final TextTheme textTheme = theme.textTheme;
    final TextStyle textStyle = textTheme.displayLarge!;

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Center(
        child: Container(
          child: Padding(
            padding: const EdgeInsets.all(36.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(
                  "Welcome",
                  textAlign: TextAlign.left,
                  style: textStyle.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 50.0),
                ),
                Text(
                  "Please login",
                  textAlign: TextAlign.left,
                  style: textStyle.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w100,
                      fontSize: 35.0),
                ),
                SizedBox(height: 45.0),
                this.form(context),
                SizedBox(
                  height: 25.0,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
