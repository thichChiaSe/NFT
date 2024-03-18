export const stringUtils = {
  getName: (name: string, limit: number) => {
    if (name.length > limit) {
      return name.substring(0, limit) + '...';
    }
    return name;
  },
  removeVietnameseTones: (str: string | undefined) => {
    if (str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
      str = str.replace(/đ/g, 'd');
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
      str = str.replace(/Đ/g, 'D');
      // Some system encode vietnamese combining accent as individual utf-8 characters
      // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
      // Remove extra spaces
      // Bỏ các khoảng trắng liền nhau
      str = str.replace(/ + /g, ' ');
      str = str.trim();
      // Remove punctuations
      // Bỏ dấu câu, kí tự đặc biệt
      str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ' '
      );
      return str;
    }
  },
  format: (str: string, length: number) => {
    if (length > str.length) {
      return str;
    }
    let index = length + 0;
    while (str[index] != ' ') {
      index++;
      if (index == str.length) break;
    }
    return `${str.substring(0, index)}${index === str.length ? '' : '...'}`;
  },
  formatDate: (date: Date) => {
    if (date) {
      const day = date.getDay();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}/${month.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}/${year.toLocaleString('en-US', {
        minimumIntegerDigits: 4,
        useGrouping: false,
      })}`;
    }
    return `--/--/----`;
  },
};
// css table IR ticket
export const width = '100px';
export const borderBottom = '3px solid #000';
export const widthColVaccine = '200px';
export const hightCell = '3em';
// id vaccine type data
export const idDTP = '9c0bc6a9-71e4-4433-9a39-08db30cb64ed';
// export const id

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export function convertNumberToVietnameseWords(number: number): string {
  const numbersInWords = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

  const units = ['trăm', 'nghìn', 'trăm', 'triệu', 'tỷ'];

  const groups = [];
  let numStr = number.toString();
  while (numStr.length > 0) {
    groups.unshift(numStr.slice(-3));
    numStr = numStr.slice(0, -3);
  }

  const words = groups.map((group, index) => {
    const groupWords = [];
    const groupNum = parseInt(group);

    if (groupNum > 0) {
      const hundreds = Math.floor(groupNum / 100);
      const tens = Math.floor((groupNum % 100) / 10);
      const ones = groupNum % 10;

      if (hundreds > 0) {
        groupWords.push(numbersInWords[hundreds] + ' trăm');
      }

      if (tens > 1) {
        groupWords.push(numbersInWords[tens] + ' mươi');
        if (ones === 1) {
          groupWords.pop();
        }
      } else if (tens === 1) {
        groupWords.push('mười');
      }

      if (ones > 0) {
        groupWords.push(numbersInWords[ones]);
      }

      if (index < units.length) {
        groupWords.push(units[index]);
      }
    }

    return groupWords.join(' ');
  });

  return words.join(' ');
}

export const formatString = (inputString: any) => {
  // Loại bỏ dấu "-"
  const stringWithoutHyphens = inputString.replace(/-/g, '');

  // Chỉ lấy 5 ký tự đầu và chuyển thành chữ hoa
  const firstFiveUppercase = stringWithoutHyphens.slice(0, 10).toUpperCase();

  return firstFiveUppercase;
};

export const status = [
  '',
  'Chờ chỉ định',
  'Chờ thanh toán',
  'Chờ tiêm',
  'Chờ nhập liệu',
  'Hoàn thành phiên',
];

export function removeDiacritics(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function clearCacheFunction1() {
  if ('caches' in window) {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName);
      });
    });
  }
}

export const TIEP_NHAN = 'Records Management';
export const DONG_DAU = 'Stamper';
export const NHAP_LIEU = 'Processing Records';
export const THU_NGAN = 'Cashier';
export const TIEM_CHUNG = 'Injector';
export const BAC_SI = 'Signer';
export const QUAN_LY = 'Management approval';
export const KHACH = '';
export const ADMIN = 'admin';
