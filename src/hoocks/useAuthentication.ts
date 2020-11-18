// import { useRef } from 'react';
/* eslint-disable react-hooks/exhaustive-deps */
import { showAlert } from '~/utils';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setToken } from '~/modules/Auth/actions';

const useAuthencation = () => {
  const [currentUser, setCurrentUser] = useState<null | any>(null);
  // const isCheck = useRef(true);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(
      setToken({
        token: '',
      }),
    );
  };

  useEffect(() => {
    // if (isCheck.current === true) {
    try {
      const subscriber = auth().onAuthStateChanged((user) => {
        // isCheck.current = false;
        //TODO check run one time
        // console.log(isCheck.current);
        if (user) {
          setCurrentUser(user);
        } else {
          logOut();
          // showAlert('Thông báo', 'Hết phiên đăng nhập!');
        }
      });
      return subscriber;
    } catch (error) {
      console.log('check authentication: ', error.toString());
      logOut();
      showAlert('Thông báo', 'Lỗi kết nối vui lòng thử lại!');
    }
    // }
  }, []);

  return [currentUser, setCurrentUser];
};

export default useAuthencation;
