export class SystemInfo{
  static domain = 'http://localhost';
  static port = '8080';
  static baseUrl = SystemInfo.domain + ':' + SystemInfo.port;
  static systemUrl = SystemInfo.domain + ':' + SystemInfo.port + '/system';
  static loginUrl = SystemInfo.domain + ':' + SystemInfo.port + '/login';
  static registrationUrl = SystemInfo.domain + ':' + SystemInfo.port + '/registration';
}
