import store from '@/store'

const entity = {
  websock: null,
  isLogon: false,
  profitBuffer: []
}

export function sendAuthToken() {
  if (entity.isLogon) return
  if (!store.getters.token) return

  entity.websock.send(
    JSON.stringify({
      type: 'auth',
      token: store.getters.token
    })
  )
  entity.isLogon = true
}

export default {
  install: function(Vue) {
    const hub = new Vue()
    Vue.prototype.$hub = hub

    setInterval(() => {
      sendAuthToken()
    }, 1000)

    const wsuri = process.env.VUE_APP_WS_API
    function start() {
      entity.websock = new WebSocket(wsuri)
      entity.websock.onmessage = function(e) {
        try {
          var res = e.data.split('\n')
          for (let i = 0; i < res.length; i++) {
            if (res[i].length < 3) {
              continue
            }
            const redata = JSON.parse(res[i])
            if (redata.type === 'tick') {
              store.dispatch('name/setTick', redata)
              switch (redata.sym) {
                case 'TXF':
                  hub.$emit('TXFTickRaw', redata)
                  break
                case 'MXF':
                  hub.$emit('MXFTickRaw', redata)
                  break
                case 'YM':
                  hub.$emit('YMTickRaw', redata)
                  break
                case 'ES':
                  hub.$emit('ESTickRaw', redata)
                  break
                case 'NQ':
                  hub.$emit('NQTickRaw', redata)
                  break
              }
            } else if (redata.type === 'depth') {
              switch (redata.sym) {
                case 'TXF':
                  hub.$emit('TXFDepth', redata)
                  break
                case 'MXF':
                  hub.$emit('MXFDepth', redata)
                  break
              }
            } else if (redata.type === 'unrealized_profit_v2') {
              hub.$emit('unrealized_profit_v2', redata)

              if (entity.profitBuffer.length === 0) {
                setTimeout(() => {
                  store.commit('resource/SET_PROFIT', entity.profitBuffer)
                  entity.profitBuffer = []
                }, 200)
              }

              entity.profitBuffer.push(redata)
            } else if (redata.type === 'strategy') {
              store.dispatch('name/setSignal', redata)
              hub.$emit('strategy', redata)
            } else {
              hub.$emit(redata.type, redata)
            }
          }
        } catch (err) {
          console.log(err, e.data)
        }
      }
      entity.websock.onopen = function() {
        entity.isLogon = false
      }
      entity.websock.onerror = function() {
        entity.websock.close()
      }
      entity.websock.onclose = function() {
        setTimeout(start, 5000)
      }
    }

    start()
  }
}
