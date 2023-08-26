import { BadRequestError } from '@/app/_lib/client';
import moment from 'moment';

const Utils = {
  parseDate: (date: string) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  },
  parseNumber: (value?: string | string[], defaultValue = 0) => {
    if (typeof value === 'undefined') {
      return defaultValue;
    }

    const number = parseInt(value.toString());

    if (isNaN(number)) {
      throw new BadRequestError();
    }

    return number;
  },
  formatDecimal: (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  decorateUrl: (url: string) => {
    let decoratedUrl;

    try {
      decoratedUrl = decodeURIComponent(url);
    } catch (e) {
      decoratedUrl = url;
    }

    return decoratedUrl.replace(/^https?:\/\/(www\.)?/, '');
  },
  isMobileView: () => {
    return typeof window === 'undefined' || window.innerWidth < 800;
  },
};

export default Utils;
