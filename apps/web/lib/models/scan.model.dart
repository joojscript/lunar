import 'package:admin/models/host.model.dart';
import 'package:flutter/material.dart';

class Scan {
  late final String id, hostId, protocol, service, state, reason;
  late final int port;
  late final DateTime createdAt, updatedAt;
  final Host? host;

  Scan({
    this.host,
    required this.id,
    required this.hostId,
    required this.port,
    required this.protocol,
    required this.service,
    required this.state,
    required this.reason,
    required this.createdAt,
    required this.updatedAt,
  });

  static Scan fromJson(Map<String, dynamic> scan) {
    debugPrint("fromJson");
    return Scan(
      id: scan["id"],
      hostId: scan["hostId"],
      port: scan["port"],
      protocol: scan["protocol"],
      service: scan["service"],
      state: scan["state"],
      reason: scan["reason"],
      createdAt: DateTime.parse(scan["createdAt"]),
      updatedAt: DateTime.parse(scan["updatedAt"]),
    );
  }
}
