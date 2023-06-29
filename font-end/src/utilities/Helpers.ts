
import _, { camelCase, isNil } from "lodash";
import moment from "moment";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { getNamePredefinedDate } from "./DateRangesPredefine";
import SnackbarUtils from "./SnackbarUtilsConfigurator";

export function formatDateTime(date: Date, errorText?: string, format?: string): string {
  if (moment(date).isValid()) {
    return moment(date).format(format || "DD-MM-YYYY HH:mm");
  }
  return errorText ? errorText : `Có lỗi xảy ra`;
}

export function formatDateHour(
  date: Date,
  errorText?: string,
  format?: string,
  timeFrom?: string | null,
  timeTo?: string | null
): string {
  if (moment(date).isValid()) {
    if (format !== "" && format !== undefined) {
      return moment(date).format(format) + " " + timeFrom + " - " + timeTo;
    }
    return moment(date).format("DD-MM-YYYY");
  }
  return errorText ? errorText : `Chưa có ngày tháng`;
}

export function formatDate(date: Date, errorText?: string, format?: string, addHours?: number): string {
  if (moment(date).isValid()) {
    if (format !== "" && format !== undefined) {
      if (addHours) return moment(date).add(addHours, "hours").format(format);
      return moment(date).format(format);
    }
    if (addHours) return moment(date).add(addHours, "hours").format("DD-MM-YYYY");
    return moment(date).format("DD-MM-YYYY");
  }
  return errorText ? errorText : `Chưa có ngày tháng`;
}

export function formatTime(date: Date, errorText?: string, addHours?: number): string {
  if (moment(date).isValid()) {
    if (addHours) return moment(date).add(addHours, "hours").format("HH:mm:ss");
    return moment(date).format("HH:mm:ss");
  }
  return errorText ? errorText : `Chưa có ngày tháng`;
}

export function formatDateUtil(date: Date, errorText?: string, format?: string, addHours?: number): string {
  if (moment(date).isValid()) {
    if (format !== "" && format !== undefined) {
      if (addHours) return moment(date).add(addHours, "hours").format(format);
      return moment(date).format(format);
    }
    if (addHours) return moment(date).add(addHours, "hours").format("DD/MM/YYYY");
    return moment(date).format("DD/MM/YYYY");
  }
  return errorText ? errorText : `Chưa có ngày tháng`;
}

export function formatDateTimeUtil(date: Date, errorText?: string, format?: string, addHours?: number): string {
  if (moment(date).isValid()) {
    if (format !== "" && format !== undefined) {
      if (addHours) return moment(date).add(addHours, "hours").format(format);
      return moment(date).format(format);
    }
    if (addHours) return moment(date).add(addHours, "hours").format("DD/MM/YYYY");
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
  }
  return errorText ? errorText : `Chưa có ngày tháng`;
}

export const formatDateKey = (dateStr: string) => {
  if (dateStr && dateStr !== "" && dateStr.toString().length >= 8) {
    let year = dateStr.toString().substring(0, 4);
    let month = dateStr.toString().substring(4, 6);
    let date = dateStr.toString().substring(6, 8);
    let res = `${date}/${month}/${year}`;
    return res;
  } else {
    return "";
  }
};

export const formatDateMaxMin = (isEndDate: boolean, dateStr?: string) => {
  // let dateStr = moment(date).format("YYYY-MM-DD");
  if (dateStr) {
    let dateMoment = moment(dateStr).utc();

    if (isEndDate) {
      return dateMoment.add(1, "days").format("YYYY-MM-DDTHH:mm:ss[Z]");
    } else {
      return dateMoment.format("YYYY-MM-DDTHH:mm:ss[Z]");
    }
  } else {
    return "";
  }
};

export function formatCurrency(number: number) {
  return `${number.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
}

export function formatNumber(number?: number | null) {
  if (number === null || number === undefined || isNaN(number)) return "0";
  else {
    let numberText = number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    if (numberText === "NaN") return "0";
    else return numberText;
  }
}

export function formatNumberDecimal(number: number | null | undefined, fixed?: number) {
  if (number === null || number === undefined || isNaN(number)) return "0";
  else {
    let numberText = parseFloat(number.toFixed(fixed !== undefined ? fixed : 3))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (numberText === "NaN") return "0";
    else return numberText;
  }
}

export function formatSummaryNumberDecimal(key: string, number: any | undefined, fixed?: number) {
  let listMoney = [
    "gross_sales",
    "net_sales",
    "returns",
    "shipping",
    "freight_amount",
    "taxes",
    "total_sales",
    "total_cost",
    "gross_profit",
    "price",
    "tax_amount",
    "line_amount",
    "line_discount_amount",
    "line_amount_after_line_discount",
    "amount",
    "allocated_discount_amount",
    "allocated_shipping_fee_amount",
    "allocated_cod_amount",
    "allocated_freight_amount",
    "allocated_deposit_amount",
    "payments",
    "cash_payments",
    "transfer_payments",
    "cod_payments",
    "point_payments",
    "mpos_payments",
    "online_payments",
    "unknown_payments",
    "net_profit",
    "point_payment_amount",
  ];
  let listNumber = [
    "discounts",
    "net_quantity",
    "ordered_item_quantity",
    "orders",
    "returned_item_quantity",
    "customers",
    "quantity",
    "shipments",
  ];
  if (key === "sum") {
    return "Tổng";
  } else if (listMoney.includes(key)) {
    return formatNumber(number);
  } else if (listNumber.includes(key)) {
    return formatNumberDecimal(number);
  } else return "";
}

export function formatMoney(money: number, currency?: string) {
  if (!money) return "0";
  if (!currency) currency = ""; // tạm ẩn đơn vị tiền tệ
  var value = money.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return value.substr(0, value.length - 2) + currency;
}

export function toDataURL(url: string, callback: (dataUrl: string) => void) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result as string);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

export function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() as any);
    reader.onerror = (error) => reject(error);
  });
}

export function removeAscent(str: string) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

export function removeVietnameseTones(str: string) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một ký tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  return str;
}

export function getCookie(cname: string) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function removeCookieByPrefix(prefix: string) {
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  let cookie = ca.find((item) => item.trim().startsWith(prefix));
  let cookieName = (cookie && cookie?.split("=")[0]) || "";
  document.cookie = cookieName + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function setCookie(cname: string, expires: Date) {
  document.cookie = `${cname}; expires=${expires.toUTCString()}; path=/`;
}


export function textAbstract(text: string, maxlength = 20) {
  if (text) {
    if (text.length <= maxlength) {
      return text;
    }
    text = text.substring(0, maxlength);
    let last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
  }
  return "";
}



export function convertColorHexToRgb(hex: string, alpha?: number) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  return "";
}

export function convertColorHexToHsl(hex: string, lightness?: number) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      if (h) {
        h /= 6;
      }
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    if (h) {
      h = Math.round(360 * h);
    }
    if (lightness) {
      l = l - lightness;
      return "hsl(" + h + "," + s + "%," + l + "%)";
    } else {
      return "hsl(" + h + "," + s + "%," + l + "%)";
    }
  } else {
    return "";
  }
}

export function measureExecutionTime(execFunc: Function) {
  const t0 = performance.now();
  const result = execFunc();
  const t1 = performance.now();
  return { result, executionTime: t1 - t0 };
}

export function formatNumberEpsilon(num: number) {
  return Math.round((num + Number.EPSILON) * 1000) / 1000;
}



// export function hasPermission(permission: string, account?: UserResponse | null) {
//   if (account) {
//     let roles = account.account_roles;
//     if (permission === null || permission === undefined || permission.trim() === "" || account.account_owner) {
//       return true;
//     }
//     if (roles) {
//       return roles.some((elem) => {
//         if (elem.scopes && elem.scopes.length > 0) {
//           if (elem.scopes[0] === "full" || elem.scopes.findIndex((m) => m === permission) >= 0) return true;
//         }
//         return false;
//       });
//     }
//   }
//   return false;
// }



// export const getListLocationPermissions = (
//   permissions: string[],
//   account: UserResponse,
//   _locations: LocationResponse[]
// ) => {
//   let locations = _locations;
//   for (let i = 0; i < permissions.length; i++) {
//     locations = getListLocationPermission(permissions[i], account, locations);
//   }
//   return locations;
// };

// export const getListLocationPermission = (
//   permission: string,
//   account: UserResponse,
//   locations: LocationResponse[]
// ) => {
//   let list: LocationResponse[] = [];
//   if (permission === null || permission === undefined || permission.trim() === "" || account.account_owner) {
//     list = locations;
//   }
//   if (account.account_roles && account.account_roles.length > 0) {
//     account.account_roles
//       .filter((m) => m.scopes && m.scopes.length > 0)
//       .forEach((role) => {
//         if (role.scopes[0] === "full" || role.scopes.findIndex((m) => m === permission) >= 0) {
//           let locationPush = locations.find((m) => m.id === role.location_id);
//           if (locationPush && list.indexOf(locationPush) === -1) {
//             list.push(locationPush);
//           }
//         }
//       });
//   }
//   return list;
// };
// export const getListLocationSomePermission = (
//   permission: string[],
//   account: UserResponse,
//   locations: LocationResponse[]
// ) => {
//   let list: LocationResponse[] = [];
//   if (permission === null || permission === undefined || permission.length === 0 || account.account_owner) {
//     list = locations;
//   }
//   if (account.account_roles && account.account_roles.length > 0) {
//     account.account_roles
//       .filter((m) => m.scopes && m.scopes.length > 0)
//       .forEach((role) => {
//         if (role.scopes[0] === "full" || role.scopes.findIndex((m) => permission.includes(m)) >= 0) {
//           let locationPush = locations.find((m) => m.id === role.location_id);
//           if (locationPush && list.indexOf(locationPush) === -1) {
//             list.push(locationPush);
//           }
//         }
//       });
//   }
//   return list;
// };


// export function hasPermissionInLocation(id: number, permissions: string[], account: UserResponse) {
//   let isAllow = false;
//   if (permissions === null || permissions === undefined || permissions.length === 0) {
//     if (account.account_owner) isAllow = true;
//     else {
//       if (id > 0 && account.account_roles && account.account_roles.length > 0) {
//         let roleFilter = account.account_roles
//           .filter((m) => m.scopes && m.scopes.length > 0)
//           .find((role) => role.location_id === id);
//         if (roleFilter) isAllow = true;
//       }
//     }
//   } else if (account.account_owner) isAllow = true;
//   else {
//     if (id > 0 && account.account_roles && account.account_roles.length > 0) {
//       let roleFilter = account.account_roles
//         .filter((m) => m.scopes && m.scopes.length > 0)
//         .find((role) => role.location_id === id);
//       if (roleFilter) {
//         if (roleFilter.scopes[0] === "full") {
//           isAllow = true;
//         } else {
//           roleFilter.scopes.forEach((scope) => {
//             let roleIndex = permissions.findIndex((permission) => permission === scope);
//             if (roleIndex >= 0) isAllow = true;
//           });
//         }
//       }
//     }
//   }

//   return isAllow;
// }


// export function checkEnableFlagsUnleash(flag?: FlagValue, domain?: string) {
//   let checkFlag = false;
//   if (domain && flag && flag.enabled && flag.strategies && flag.strategies.length > 0) {
//     let strategie = flag.strategies.find((a) => a.name === "userWithId");
//     if (strategie && strategie.parameters) {
//       let userIds = strategie.parameters.userIds;
//       if (userIds && userIds !== "" && typeof userIds === "string") {
//         let listDomain = userIds.split(",");
//         if (listDomain && listDomain.length > 0) {
//           if (listDomain.findIndex((m) => m === domain) > -1) {
//             checkFlag = true;
//           }
//         }
//       }
//     }
//   }
//   return checkFlag;
// }

// export function checkEnableFlagsUnleashGradual(flag?: FlagValue, domain?: string) {
//   let checkFlag = false;
//   if (domain && flag && flag.enabled && flag.strategies && flag.strategies.length > 0) {
//     let strategie = flag.strategies.find((a) => a.name === "userWithId");
//     let gradual = flag.strategies.find((a) => a.name === "gradualRolloutRandom");
//     if (gradual && gradual.parameters && gradual.parameters.percentage === "100") {
//       checkFlag = true;
//     } else {
//       if (strategie && strategie.parameters) {
//         let userIds = strategie.parameters.userIds;
//         if (userIds && userIds !== "" && typeof userIds === "string") {
//           let listDomain = userIds.split(",");
//           if (listDomain && listDomain.length > 0) {
//             if (listDomain.findIndex((m) => m === domain) > -1) {
//               checkFlag = true;
//             }
//           }
//         }
//       }
//     }
//   }
//   return checkFlag;
// }

// export function checkAuthorizedAndNoti(
//   permission: string,
//   account?: UserResponse | null,
//   enqueueSnackbar?: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey
// ) {
//   if (!hasPermission(permission, account)) {
//     if (enqueueSnackbar) {
//       SnackbarUtils.error(i18n.t(`error:error.notHaveAction`));
//     }
//     return false;
//   }
//   return true;
// }

// export function checkAuthorizedAndNotiV2(permission: string | string[], account?: UserResponse | null) {
//   if (typeof permission === "string" ? !hasPermission(permission, account) : !hasPermissions(permission, account)) {
//     SnackbarUtils.error(i18n.t(`error:error.notHaveAction`));
//     return false;
//   }
//   return true;
// }

// export function checkAuthorizedV2(permission: string | string[], account?: UserResponse | null) {
//   if (typeof permission === "string" ? !hasPermission(permission, account) : !hasPermissions(permission, account)) {
//     return false;
//   }
//   return true;
// }

// type date = string => format DD/MM/YYYY
export function formatDateUTC(
  date?: Date | string | null,
  isEndDate: boolean = false,
  format: string = "YYYY-MM-DDTHH:mm:ss[Z]"
) {
  if (date) {
    let dateUtc;
    if (typeof date === "string") {
      dateUtc = moment(date, "DD/MM/YYYY").utc();
    } else {
      // format date theo chuẩn  ISO string (YYYY-MM-DD) sau đó chuyển về dạng UTC
      dateUtc = moment(moment(date).format("YYYY-MM-DD")).utc();
    }
    if (isEndDate) {
      // cộng 1 ngày trừ 1s để lấy 16:59:59 của ngày hôm đó tức là 23:59:59
      return dateUtc.add(1, "days").subtract(1, "seconds").format(format);
    }
    return dateUtc.format(format);
  }
  return "";
}

export function convertDateUTCToLocalDate(date: string | Date, isEndDate: boolean = false) {
  if (isEndDate) {
    return moment.utc(date).add(1, "seconds").subtract(1, "days").local().toDate();
  }
  return moment.utc(date).local().toDate();
}

export function formatDateUTCToLocalDateString(
  date: string | Date,
  isEndDate: boolean = false,
  format: string = "DD/MM/YYYY"
) {
  if (isEndDate) {
    return moment.utc(date).add(1, "seconds").subtract(1, "days").local().format(format);
  }
  return moment.utc(date).local().format(format);
}

export function validateSpecialCharacter(value: string) {
  return value.indexOf(",") > -1 || value.indexOf("'") > -1;
}

export function formatDateCanNull(dateStr?: string | null, format?: string) {
  let rs = "";
  if (dateStr) {
    let date = new Date(dateStr);
    if (format) {
      rs = moment(date).format(format);
    } else {
      rs = moment(date).format("DD/MM/YYYY");
    }
  } else {
    rs = "---";
  }
  return rs;
}

export const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`);


export function getLinkFileImportByCountry(link: { [key: string]: string }) {
  let country = localStorage.getItem("i18nextLng")?.toString();
  return country && link[`${country}`] ? link[`${country}`] : link["vi"];
}


export const formatStringLength = (dataString: string, lengthData: number) => {
  return dataString != null
    ? dataString.length > lengthData
      ? dataString.substring(0, lengthData) + "..."
      : dataString
    : "---";
};
export const sortByIds = (data: any[], ids: any[]) => {
  //get item not in ids Array
  let dataNotInIds = data.filter((item) => {
    return ids.indexOf(item.id) < 0;
  });
  let dataSort = data.sort((a, b) => {
    return ids.indexOf(a.id) - ids.indexOf(b.id);
  });
  if (dataNotInIds.length > 0) {
    //get item not in dataNotInIds Array
    dataSort = dataSort.filter((x) => !dataNotInIds.includes(x));
    dataSort = dataNotInIds.concat(dataSort);
  }
  return dataSort;
};

export function getWords(str: string, number: number) {
  return str.split(/\s+/).slice(0, number).join(" ");
}

export function diffDays(date: any, otherDate: any) {
  return Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
}

export const findMessageError = (values: any) => {
  let objectMessageError = {};
  if (!values) {
    return "";
  }
  if (Object.prototype.hasOwnProperty.call(values, "message")) {
    objectMessageError = values;
  } else if (typeof values === "object" && !_.isEmpty(values)) {
    _.forEach(values, function (value, key) {
      if (_.isEmpty(objectMessageError)) {
        objectMessageError = findMessageError(value);
      } else {
        return false;
      }
    });
  }
  return objectMessageError;
};


export function base64toBlob(data: string, fileName: string) {
  const pdfContentType = "application/pdf";
  const bytes = atob(data);
  let length = bytes.length;
  let out = new Uint8Array(length);
  for (let i = 0; i < data.length; ++i) {
    out[i] = data.charCodeAt(i);
  }

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }

  return new Blob([out], { type: pdfContentType });
}

export const formatSizeFileMB = (size?: number) => {
  if (size) return formatNumber(parseFloat((size / 1024).toFixed(0))) + " KB";
  else return "0.0 KB";
};

export const encodingASCIIAndToBase64Str = (str: string) => {
  if (isNil(str)) return "";
  let ascii = [];
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    ascii.push(code);
  }
  return btoa(String.fromCharCode.apply(null, ascii));
};

export const getNameStartEndDate = (
  startDate?: Date | null,
  endDate?: Date | null,
  _predefinedDate?: string,
  defaultValue?: string,
  format: string = "DD/MM/YYYY"
) => {
  if (_predefinedDate) {
    return getNamePredefinedDate(_predefinedDate);
  } else if (!isNil(startDate) || !isNil(endDate)) {
    return `${startDate
        ? moment(startDate).format(format)
        : `Từ trước`
      } - ${endDate ? moment(endDate).format(format) : `đến nay`}`;
  }
  return defaultValue;
};

export const isAsciiString = (str: string) => {
  if (str || str === "") {
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127) return false;
    }
  }
  return true;
};
