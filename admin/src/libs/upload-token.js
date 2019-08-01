const qiniu = require('qiniu')

// 自己可以到"www.qiniu.com" 申请自己的七牛空间
// 这个账号是我的，不是开放的哦
const ACCESS_KEY = "czPfY4Tn1ZpUedXdbL1VdT-YLc7IaG1PNeEp4RWq";
const SECRET_KEY = "Iy1Z0NjwQh2518MfsT729twZliicXumKzpCrk5wa";

export default async function getUploadToken() {
  return new Promise((resolve, reject) => {
    let mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
    let options = {
      scope: "chelflan_file",
      expires: 7200
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);

    if (uploadToken) {
      resolve({
        token: uploadToken
      })
    } else {
      reject()
    }
  })
}

