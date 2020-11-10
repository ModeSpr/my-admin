import request from '@/utils/request'

export function login(data) {
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data
  // })
  return {
    code: 200,
    msg: 'success',
    data: { accessToken: 'admin-accessToken' }
  }
}

export function getInfo(token) {
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
    const { accessToken } = token;
    let permissions = ["admin"];
    let username = "admin";
    if ("admin-accessToken" === accessToken) {
      permissions = ["admin"];
      username = "admin";
    }
    if ("editor-accessToken" === accessToken) {
      permissions = ["editor"];
      username = "editor";
    }
    if ("test-accessToken" === accessToken) {
      permissions = ["admin", "editor"];
      username = "test";
    }
    reject( {
      code: 200,
      msg: "success",
      data: {
        permissions,
        username,
        "avatar": "https://i.gtimg.cn/club/item/face/img/2/15922_100.gif"
      }
    });

    }, 100);
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
