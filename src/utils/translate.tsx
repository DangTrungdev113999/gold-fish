export const translateFirebaseMessage = (value: string) => {
  const data = {
    'code has expired': 'Mã xác thực hết hạn. Vui lòng yêu cầu mã mới.',
    'code used to create the phone auth credential is invalid':
      'Mã xác thực không đúng. Vui lòng xác thực lại.',
    'blocked all requests':
      'Bạn đã lấy OTP quá số lần cho phép. Vui lòng thử lại sau 30 phút.',
  };
  for (const i in data) {
    if (value.toLowerCase().indexOf(i) !== -1) {
      return data[i];
    }
  }
};
