/**
 * Urja Foods Careers - Country & Calling Code Registry
 * Provides international calling codes, flags, search, and country-specific phone validation.
 */

export const COUNTRIES = [
  {
    name: 'India',
    iso: 'IN',
    dial: '+91',
    flag: '🇮🇳',
    lengths: [10],
    placeholder: '98765 43210',
    regex: /^[6-9]\d{9}$/,
    hint: '10 digits starting with 6, 7, 8, or 9',
  },
  {
    name: 'United States',
    iso: 'US',
    dial: '+1',
    flag: '🇺🇸',
    lengths: [10],
    placeholder: '555 123 4567',
    regex: /^[2-9]\d{9}$/,
    hint: '10 digits starting with 2-9',
  },
  {
    name: 'United Kingdom',
    iso: 'GB',
    dial: '+44',
    flag: '🇬🇧',
    lengths: [10, 11],
    placeholder: '7911 123456',
    regex: /^[1-9]\d{9,10}$/,
    hint: '10 to 11 digits',
  },
  {
    name: 'United Arab Emirates',
    iso: 'AE',
    dial: '+971',
    flag: '🇦🇪',
    lengths: [9],
    placeholder: '50 123 4567',
    regex: /^5\d{8}$/,
    hint: '9 digits starting with 5',
  },
  {
    name: 'Saudi Arabia',
    iso: 'SA',
    dial: '+966',
    flag: '🇸🇦',
    lengths: [9],
    placeholder: '50 123 4567',
    regex: /^5\d{8}$/,
    hint: '9 digits starting with 5',
  },
  {
    name: 'Canada',
    iso: 'CA',
    dial: '+1',
    flag: '🇨🇦',
    lengths: [10],
    placeholder: '555 123 4567',
    regex: /^[2-9]\d{9}$/,
    hint: '10 digits',
  },
  {
    name: 'Australia',
    iso: 'AU',
    dial: '+61',
    flag: '🇦🇺',
    lengths: [9],
    placeholder: '412 345 678',
    regex: /^4\d{8}$/,
    hint: '9 digits starting with 4',
  },
  {
    name: 'Germany',
    iso: 'DE',
    dial: '+49',
    flag: '🇩🇪',
    lengths: [10, 11],
    placeholder: '151 2345678',
    regex: /^[1-9]\d{9,10}$/,
    hint: '10 to 11 digits',
  },
  {
    name: 'Singapore',
    iso: 'SG',
    dial: '+65',
    flag: '🇸🇬',
    lengths: [8],
    placeholder: '8123 4567',
    regex: /^[89]\d{7}$/,
    hint: '8 digits starting with 8 or 9',
  },
  {
    name: 'Qatar',
    iso: 'QA',
    dial: '+974',
    flag: '🇶🇦',
    lengths: [8],
    placeholder: '3312 3456',
    regex: /^[3567]\d{7}$/,
    hint: '8 digits starting with 3, 5, 6, or 7',
  },
  {
    name: 'Kuwait',
    iso: 'KW',
    dial: '+965',
    flag: '🇰🇼',
    lengths: [8],
    placeholder: '5123 4567',
    regex: /^[569]\d{7}$/,
    hint: '8 digits',
  },
  {
    name: 'Oman',
    iso: 'OM',
    dial: '+968',
    flag: '🇴🇲',
    lengths: [8],
    placeholder: '9123 4567',
    regex: /^[79]\d{7}$/,
    hint: '8 digits starting with 7 or 9',
  },
  {
    name: 'Bahrain',
    iso: 'BH',
    dial: '+973',
    flag: '🇧🇭',
    lengths: [8],
    placeholder: '3612 3456',
    regex: /^3\d{7}$/,
    hint: '8 digits starting with 3',
  },
  {
    name: 'Bangladesh',
    iso: 'BD',
    dial: '+880',
    flag: '🇧🇩',
    lengths: [10],
    placeholder: '1712 345678',
    regex: /^1[3-9]\d{8}$/,
    hint: '10 digits starting with 13-19',
  },
  {
    name: 'Nepal',
    iso: 'NP',
    dial: '+977',
    flag: '🇳🇵',
    lengths: [10],
    placeholder: '9812 345678',
    regex: /^9[78]\d{8}$/,
    hint: '10 digits starting with 97 or 98',
  },
  {
    name: 'Sri Lanka',
    iso: 'LK',
    dial: '+94',
    flag: '🇱🇰',
    lengths: [9],
    placeholder: '71 234 5678',
    regex: /^7\d{8}$/,
    hint: '9 digits starting with 7',
  },
  {
    name: 'Malaysia',
    iso: 'MY',
    dial: '+60',
    flag: '🇲🇾',
    lengths: [9, 10],
    placeholder: '12 345 6789',
    regex: /^1\d{8,9}$/,
    hint: '9 to 10 digits',
  },
  {
    name: 'New Zealand',
    iso: 'NZ',
    dial: '+64',
    flag: '🇳🇿',
    lengths: [8, 9, 10],
    placeholder: '21 123 4567',
    regex: /^[2-9]\d{7,9}$/,
    hint: '8 to 10 digits',
  },
  {
    name: 'France',
    iso: 'FR',
    dial: '+33',
    flag: '🇫🇷',
    lengths: [9],
    placeholder: '6 12 34 56 78',
    regex: /^[67]\d{8}$/,
    hint: '9 digits starting with 6 or 7',
  },
  {
    name: 'Netherlands',
    iso: 'NL',
    dial: '+31',
    flag: '🇳🇱',
    lengths: [9],
    placeholder: '6 12345678',
    regex: /^6\d{8}$/,
    hint: '9 digits starting with 6',
  },
  {
    name: 'Italy',
    iso: 'IT',
    dial: '+39',
    flag: '🇮🇹',
    lengths: [9, 10],
    placeholder: '312 3456789',
    regex: /^3\d{8,9}$/,
    hint: '9 to 10 digits',
  },
  {
    name: 'Spain',
    iso: 'ES',
    dial: '+34',
    flag: '🇪🇸',
    lengths: [9],
    placeholder: '612 34 56 78',
    regex: /^[67]\d{8}$/,
    hint: '9 digits starting with 6 or 7',
  },
  {
    name: 'Switzerland',
    iso: 'CH',
    dial: '+41',
    flag: '🇨🇭',
    lengths: [9],
    placeholder: '78 123 45 67',
    regex: /^7\d{8}$/,
    hint: '9 digits starting with 7',
  },
  {
    name: 'Japan',
    iso: 'JP',
    dial: '+81',
    flag: '🇯🇵',
    lengths: [10],
    placeholder: '90 1234 5678',
    regex: /^[789]0\d{8}$/,
    hint: '10 digits starting with 70, 80, or 90',
  },
  {
    name: 'South Korea',
    iso: 'KR',
    dial: '+82',
    flag: '🇰🇷',
    lengths: [9, 10],
    placeholder: '10 1234 5678',
    regex: /^10\d{7,8}$/,
    hint: '9 to 10 digits',
  },
  {
    name: 'Kenya',
    iso: 'KE',
    dial: '+254',
    flag: '🇰🇪',
    lengths: [9],
    placeholder: '712 345678',
    regex: /^[71]\d{8}$/,
    hint: '9 digits starting with 7 or 1',
  },
  {
    name: 'South Africa',
    iso: 'ZA',
    dial: '+27',
    flag: '🇿🇦',
    lengths: [9],
    placeholder: '71 234 5678',
    regex: /^[678]\d{8}$/,
    hint: '9 digits starting with 6, 7, or 8',
  },
  {
    name: 'Brazil',
    iso: 'BR',
    dial: '+55',
    flag: '🇧🇷',
    lengths: [10, 11],
    placeholder: '11 91234 5678',
    regex: /^[1-9]{2}9?\d{8}$/,
    hint: '10 to 11 digits',
  },
  {
    name: 'Indonesia',
    iso: 'ID',
    dial: '+62',
    flag: '🇮🇩',
    lengths: [9, 10, 11, 12],
    placeholder: '812 3456 7890',
    regex: /^8\d{8,11}$/,
    hint: '9 to 12 digits',
  },
  {
    name: 'Philippines',
    iso: 'PH',
    dial: '+63',
    flag: '🇵🇭',
    lengths: [10],
    placeholder: '912 345 6789',
    regex: /^9\d{9}$/,
    hint: '10 digits starting with 9',
  },
  {
    name: 'Vietnam',
    iso: 'VN',
    dial: '+84',
    flag: '🇻🇳',
    lengths: [9],
    placeholder: '91 234 5678',
    regex: /^[35789]\d{8}$/,
    hint: '9 digits starting with 3, 5, 7, 8, or 9',
  },
  {
    name: 'Thailand',
    iso: 'TH',
    dial: '+66',
    flag: '🇹🇭',
    lengths: [9],
    placeholder: '81 234 5678',
    regex: /^[689]\d{8}$/,
    hint: '9 digits',
  },
  {
    name: 'Ireland',
    iso: 'IE',
    dial: '+353',
    flag: '🇮🇪',
    lengths: [9],
    placeholder: '83 123 4567',
    regex: /^8\d{8}$/,
    hint: '9 digits',
  },
  {
    name: 'Sweden',
    iso: 'SE',
    dial: '+46',
    flag: '🇸🇪',
    lengths: [9],
    placeholder: '70 123 45 67',
    regex: /^7\d{8}$/,
    hint: '9 digits',
  },
  {
    name: 'Norway',
    iso: 'NO',
    dial: '+47',
    flag: '🇳🇴',
    lengths: [8],
    placeholder: '412 34 567',
    regex: /^[49]\d{7}$/,
    hint: '8 digits',
  },
  {
    name: 'Denmark',
    iso: 'DK',
    dial: '+45',
    flag: '🇩🇰',
    lengths: [8],
    placeholder: '20 12 34 56',
    regex: /^[2-9]\d{7}$/,
    hint: '8 digits',
  },
  {
    name: 'Poland',
    iso: 'PL',
    dial: '+48',
    flag: '🇵🇱',
    lengths: [9],
    placeholder: '512 345 678',
    regex: /^[4-9]\d{8}$/,
    hint: '9 digits',
  },
  {
    name: 'Turkey',
    iso: 'TR',
    dial: '+90',
    flag: '🇹🇷',
    lengths: [10],
    placeholder: '532 123 4567',
    regex: /^5\d{9}$/,
    hint: '10 digits starting with 5',
  },
  {
    name: 'Egypt',
    iso: 'EG',
    dial: '+20',
    flag: '🇪🇬',
    lengths: [10],
    placeholder: '10 1234 5678',
    regex: /^1[0125]\d{8}$/,
    hint: '10 digits starting with 10, 11, 12, or 15',
  },
  {
    name: 'Israel',
    iso: 'IL',
    dial: '+972',
    flag: '🇮🇱',
    lengths: [9],
    placeholder: '50 123 4567',
    regex: /^5\d{8}$/,
    hint: '9 digits',
  },
  {
    name: 'China',
    iso: 'CN',
    dial: '+86',
    flag: '🇨🇳',
    lengths: [11],
    placeholder: '138 0000 0000',
    regex: /^1[3-9]\d{9}$/,
    hint: '11 digits starting with 1',
  },
  {
    name: 'Hong Kong',
    iso: 'HK',
    dial: '+852',
    flag: '🇭🇰',
    lengths: [8],
    placeholder: '9123 4567',
    regex: /^[569]\d{7}$/,
    hint: '8 digits',
  },
  {
    name: 'Taiwan',
    iso: 'TW',
    dial: '+886',
    flag: '🇹🇼',
    lengths: [9],
    placeholder: '912 345 678',
    regex: /^9\d{8}$/,
    hint: '9 digits starting with 9',
  },
  {
    name: 'Pakistan',
    iso: 'PK',
    dial: '+92',
    flag: '🇵🇰',
    lengths: [10],
    placeholder: '300 1234567',
    regex: /^3\d{9}$/,
    hint: '10 digits starting with 3',
  },
  {
    name: 'Nigeria',
    iso: 'NG',
    dial: '+234',
    flag: '🇳🇬',
    lengths: [10],
    placeholder: '802 123 4567',
    regex: /^[789]\d{9}$/,
    hint: '10 digits',
  },
  {
    name: 'Mexico',
    iso: 'MX',
    dial: '+52',
    flag: '🇲🇽',
    lengths: [10],
    placeholder: '55 1234 5678',
    regex: /^[1-9]\d{9}$/,
    hint: '10 digits',
  },
];

// Default Country: India (+91)
export const DEFAULT_COUNTRY = COUNTRIES[0];

export const getCountryByIso = (iso) => {
  if (!iso) return DEFAULT_COUNTRY;
  const found = COUNTRIES.find((c) => c.iso.toUpperCase() === String(iso).toUpperCase());
  return found || DEFAULT_COUNTRY;
};

export const getCountryByDial = (dial) => {
  if (!dial) return DEFAULT_COUNTRY;
  const cleanDial = dial.startsWith('+') ? dial : `+${dial}`;
  const found = COUNTRIES.find((c) => c.dial === cleanDial);
  return found || DEFAULT_COUNTRY;
};

/**
 * Validate phone number against country-specific rules
 */
export const validateCountryPhone = (phoneNumber, countryIso = 'IN') => {
  if (!phoneNumber || !String(phoneNumber).trim()) {
    return { valid: false, error: 'Phone Number is required.' };
  }

  const country = getCountryByIso(countryIso) || DEFAULT_COUNTRY;
  const cleanDigits = String(phoneNumber).replace(/\D/g, '');

  if (!cleanDigits) {
    return { valid: false, error: 'Please enter numbers only.' };
  }

  // Country specific regex check if available
  if (country.regex) {
    if (!country.regex.test(cleanDigits)) {
      return {
        valid: false,
        error: `Please enter a valid ${country.name} phone number (${country.hint || `${country.lengths.join(' or ')} digits`}).`,
      };
    }
  } else if (country.lengths && country.lengths.length > 0) {
    if (!country.lengths.includes(cleanDigits.length)) {
      return {
        valid: false,
        error: `${country.name} phone number must be ${country.lengths.join(' or ')} digits (currently ${cleanDigits.length} digits).`,
      };
    }
  } else {
    // E.164 generic standard: 7 to 15 digits
    if (cleanDigits.length < 7 || cleanDigits.length > 15) {
      return {
        valid: false,
        error: 'Phone number must be between 7 and 15 digits.',
      };
    }
  }

  return { valid: true, error: null };
};
