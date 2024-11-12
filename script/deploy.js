import { NodeSSH } from 'node-ssh'
import 'dotenv/config'
const ssh = new NodeSSH()

const deploy = async () => {
  try {
    await ssh.connect({
      host: process.env.ALIYUN_SSH_HOST,
      username: process.env.ALIYUN_SSH_USERNAME,
      password: process.env.ALIYUN_SSH_PASSWORD,
    })

    console.log('连接成功')

    await ssh.execCommand('rm -r /usr/share/caddy/summer')
    console.log('旧版本删除成功')

    const res = await ssh.putDirectory('summer', '/usr/share/caddy/summer')
    console.log(res ? '新版本上传成功' : `新版本上传失败: ${res}`)

    ssh.dispose()
    console.log('部署完成')
  } catch (error) {
    console.error('部署失败:', error)
  }
}

deploy()
