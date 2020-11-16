/* eslint-disable react-hooks/exhaustive-deps */
import { showAlert } from '~/utils';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setToken } from '~/modules/Auth/actions';

const useAuthencation = () => {
  const [currentUser, setCurrentUser] = useState<null | any>(null);

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(
      setToken({
        token: '',
      }),
    );
  };

  useEffect(() => {
    try {
      auth().onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user);
        } else {
          logOut();
        }
      });
    } catch (error) {
      console.log('check authentication: ', error.toString());
      logOut();
      showAlert('Thông báo', 'Lỗi kết nối vui lòng thử lại!');
    }
  }, []);

  return [currentUser, setCurrentUser];
};

export default useAuthencation;
