import axios from 'axios';

const url = "http://localhost:3000/test/time"

class EmotionService {
    getEmotions() {
        return axios.get(url)
    }
}
export default new EmotionService()