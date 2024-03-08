
import  GoogleSheets from '../actions/GoogleSheets';

export default async function handler(req, res) {
  try {
    const data = await GoogleSheets();
    res.status(200).json({ data });
  } catch (error) {
    console.error('Failed to fetch data from Google Sheets:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
}
