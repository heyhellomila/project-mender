import axios from 'axios';	
import { LOCAL_API_KEY } from 'react-native-dotenv'	
import { AsyncStorage } from 'react-native';	

var api = axios.create({	
    baseURL: `http://${LOCAL_API_KEY}/api`	
});	

export default api;
