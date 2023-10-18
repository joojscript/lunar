import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Dio? _instance;

Dio initializeRest() {
  if (_instance != null) {
    return _instance!;
  }

  String baseUrl;

  try {
    baseUrl = dotenv.get("SERVER_ENDPOINT");
  } catch (e) {
    baseUrl = const String.fromEnvironment('SERVER_ENDPOINT');
  }

  var options = BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: Duration(seconds: 5),
      receiveTimeout: Duration(seconds: 3),
      contentType: 'application/json',
      validateStatus: (status) => true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      });
  Dio _client = Dio(options);

  _instance = _client;

  return _client;
}
