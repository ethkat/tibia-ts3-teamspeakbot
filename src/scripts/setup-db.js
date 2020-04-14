import Meta from '../api/models/meta';

export const setupDB = async (spinner) => (
  new Promise(async (resolve, reject) => {
    try {
      spinner.text = 'Creating Meta Data';

      const newMeta = new Meta({ lastCheck: new Date() });

      await newMeta.save();

      resolve();
    } catch (error) {
      reject(error);
    }
  })
);
