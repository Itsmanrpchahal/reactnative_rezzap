import {Dimensions, Platform} from 'react-native';

export const WINDOW_DEVICE_WIDTH = Dimensions.get('window').width;
export const WINDOW_DEVICE_HEIGHT = Dimensions.get('window').height;

export const imageUrl = "https://www.rezzap.com/uploads/profile-photo/";
export const pdfUrl = "https://www.rezzap.com/uploads/activity-pdfs/";
export const activityImages = "https://www.rezzap.com/uploads/activity-images/";
export const CURRENT_TIME = 'CURRENT_TIME';

export const radio_props = [
  { label: "Male  ", value: 1 },
  { label: "Female  ", value: 2 },
  { label: "Other", value: 3 },
];

export const accountType = [
  { label: "Individual", value: 1 },
  { label: "My Spin", value: 2 },

];

export const visibilty = [
  { label: "Public", value: 0 },
  { label: "Private", value: 1 },

];

export const designation = [
  { label: "Student", value: 0 },
  { label: "Parent", value: 1 },
  { label: "College Counselor", value: 2 },
  { label: "Admissions - College", value: 3 },
  { label: "Recruiter", value: 4 },
  { label: "Company", value: 5 },
  { label: "Coach", value: 6},

];

export const  STATES = [
  {label: "Alabama", value: 'AL'},
  {label: "Alaska", value: 'AK'},
  {label: "Arizona", value: 'AZ'},
  {label: "Arkansas", value: 'AR'},
  {label: "California", value: 'CA'},
  {label: "Colorado", value: 'CO'},
  {label: "Connecticut", value: 'CT'},
  {label: "Delaware", value: 'DE'},
  {label: "District Of Columbia", value: 'DC'},
  {label: "Florida", value: 'FL'},
  {label: "Georgia", value: 'GA'},
  {label: "Hawaii", value: 'HI'},
  {label: "Idaho", value: 'ID'},
  {label: "Illinois", value: 'IL'},
  {label: "Indiana", value: 'IN'},
  {label: "Iowa", value: 'IA'},
  {label: "Kansas", value: 'KS'},
  {label: "Kentucky", value: 'KY'},
  {label: "Louisiana", value: 'LA'},
  {label: "Maine", value: 'ME'},
  {label: "Maryland", value: 'MD'},
  {label: "Massachusetts", value: 'MA'},
  {label: "Michigan", value: 'MI'},
  {label: "Minnesota", value: 'MN'},
  {label: "Mississippi", value: 'MS'},
  {label: "Missouri", value: 'MO'},
  {label: "Montana", value: 'MT'},
  {label: "Nebraska", value: 'NE'},
  {label: "Nevada", value: 'NV'},
  {label: "New Hampshire", value: 'NH'},
  {label: "New Jersey", value: 'NJ'},
  {label: "New Mexico", value: 'NM'},
  {label: "New York", value: 'NJ'},
  {label: "North Carolina", value: 'NC'},
  {label: "North Dakota", value: 'ND'},
  {label: "Ohio", value: 'OH'},
  {label: "Oklahoma", value: 'OK'},
  {label: "Oregon", value: 'OR'},
  {label: "Pennsylvania", value: 'PA'},
  {label: "Rhode Island", value: 'RI'},
  {label: "South Carolina", value: 'SC'},
  {label: "South Dakota", value: 'SD'},
  {label: "Tennessee", value: 'TN'},
  {label: "Texas", value: 'TX'},
  {label: "Utah", value: 'UT'},
  {label: "Vermont", value: 'VT'},
  {label: "Virginia", value: 'VA'},
  {label: "Washington", value: 'WA'},
  {label: "West Virginia", value: 'WV'},
  {label: "Wisconsin", value: 'WI'},
  {label: "Wyoming", value: 'WY'},
];
