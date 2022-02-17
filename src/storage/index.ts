import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @param key
 * @param value
 */
const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // @ts-ignore
    alert('error saving datas');
    // saving error
  }
};

/**
 * @param key
 */
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    } else {
      return null;
    }
  } catch (e) {
    // error reading value
    // @ts-ignore
    alert('error saving data');
  }
};

/**
 * @param key
 */
const flushStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }

  console.log('Done.');
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};

export {storeData, getData, flushStorage, clearAll};
