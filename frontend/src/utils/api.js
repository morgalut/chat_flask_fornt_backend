import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Flask API
const BACKUP_API_URL = 'http://localhost:5001'; // Node.js backup API

const fetchChatGPTMessage = async (name) => {
    try {
        const response = await axios.post(`${API_URL}/chatgpt/get_response`, { name });
        return response.data.message;
    } catch (error) {
        console.error('Error with Flask API, trying backup server:', error);
        try {
            const response = await axios.post(`${BACKUP_API_URL}/chatgpt/get_response`, { name });
            return response.data.message;
        } catch (backupError) {
            console.error('Error with backup server:', backupError);
            throw new Error('Failed to fetch ChatGPT response from both servers');
        }
    }
};

export { fetchChatGPTMessage };
