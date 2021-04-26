export class SystemInfo{

  static domain = 'http://localhost';
  static port = '8080';
  static baseUrl = SystemInfo.domain + ':' + SystemInfo.port;
  static systemUrl = SystemInfo.domain + ':' + SystemInfo.port + '/system';
  static loginUrl = SystemInfo.domain + ':' + SystemInfo.port + '/login';
  static registrationUrl = SystemInfo.domain + ':' + SystemInfo.port + '/registration';
}


export class CookieManager{

  static getCookie(name: string): any {
        const cookieArray: Array<string> = document.cookie.split(';');
        const cookieArrayLen: number = cookieArray.length;
        const cookieName = `${name}=`;
        let c: string;

        for (let i = 0; i < cookieArrayLen; i += 1) {
            c = cookieArray[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) === 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

    static deleteCookie(name): any{
        this.setCookie(name, '', -1);
    }

    static setCookie(name: string, value: string, expireDays: number, path: string = ''): any{
        const date: Date = new Date();
        date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
        const expires = `expires=${date.toUTCString()}`;
        const cPath: string = path ? `; path=${path}` : '';
        document.cookie = `${name}=${value}; ${expires}${cPath}`;
    }
}
