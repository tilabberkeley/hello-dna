// @rails/actioncable/src@7.2.102 downloaded from https://ga.jspm.io/npm:@rails/actioncable@7.2.102/src/index.js

var t={logger:typeof console!=="undefined"?console:void 0,WebSocket:typeof WebSocket!=="undefined"?WebSocket:void 0};var e={log(...e){if(this.enabled){e.push(Date.now());t.logger.log("[ActionCable]",...e)}}};const now=()=>(new Date).getTime();const secondsSince=t=>(now()-t)/1e3;class ConnectionMonitor{constructor(t){this.visibilityDidChange=this.visibilityDidChange.bind(this);this.connection=t;this.reconnectAttempts=0}start(){if(!this.isRunning()){this.startedAt=now();delete this.stoppedAt;this.startPolling();addEventListener("visibilitychange",this.visibilityDidChange);e.log(`ConnectionMonitor started. stale threshold = ${this.constructor.staleThreshold} s`)}}stop(){if(this.isRunning()){this.stoppedAt=now();this.stopPolling();removeEventListener("visibilitychange",this.visibilityDidChange);e.log("ConnectionMonitor stopped")}}isRunning(){return this.startedAt&&!this.stoppedAt}recordMessage(){this.pingedAt=now()}recordConnect(){this.reconnectAttempts=0;delete this.disconnectedAt;e.log("ConnectionMonitor recorded connect")}recordDisconnect(){this.disconnectedAt=now();e.log("ConnectionMonitor recorded disconnect")}startPolling(){this.stopPolling();this.poll()}stopPolling(){clearTimeout(this.pollTimeout)}poll(){this.pollTimeout=setTimeout((()=>{this.reconnectIfStale();this.poll()}),this.getPollInterval())}getPollInterval(){const{staleThreshold:t,reconnectionBackoffRate:e}=this.constructor;const n=Math.pow(1+e,Math.min(this.reconnectAttempts,10));const i=this.reconnectAttempts===0?1:e;const o=i*Math.random();return t*1e3*n*(1+o)}reconnectIfStale(){if(this.connectionIsStale()){e.log(`ConnectionMonitor detected stale connection. reconnectAttempts = ${this.reconnectAttempts}, time stale = ${secondsSince(this.refreshedAt)} s, stale threshold = ${this.constructor.staleThreshold} s`);this.reconnectAttempts++;if(this.disconnectedRecently())e.log(`ConnectionMonitor skipping reopening recent disconnect. time disconnected = ${secondsSince(this.disconnectedAt)} s`);else{e.log("ConnectionMonitor reopening");this.connection.reopen()}}}get refreshedAt(){return this.pingedAt?this.pingedAt:this.startedAt}connectionIsStale(){return secondsSince(this.refreshedAt)>this.constructor.staleThreshold}disconnectedRecently(){return this.disconnectedAt&&secondsSince(this.disconnectedAt)<this.constructor.staleThreshold}visibilityDidChange(){document.visibilityState==="visible"&&setTimeout((()=>{if(this.connectionIsStale()||!this.connection.isOpen()){e.log(`ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = ${document.visibilityState}`);this.connection.reopen()}}),200)}}ConnectionMonitor.staleThreshold=6;ConnectionMonitor.reconnectionBackoffRate=.15;var n={message_types:{welcome:"welcome",disconnect:"disconnect",ping:"ping",confirmation:"confirm_subscription",rejection:"reject_subscription"},disconnect_reasons:{unauthorized:"unauthorized",invalid_request:"invalid_request",server_restart:"server_restart",remote:"remote"},default_mount_path:"/cable",protocols:["actioncable-v1-json","actioncable-unsupported"]};const{message_types:i,protocols:o}=n;const s=o.slice(0,o.length-1);const r=[].indexOf;class Connection{constructor(t){this.open=this.open.bind(this);this.consumer=t;this.subscriptions=this.consumer.subscriptions;this.monitor=new ConnectionMonitor(this);this.disconnected=true}send(t){if(this.isOpen()){this.webSocket.send(JSON.stringify(t));return true}return false}open(){if(this.isActive()){e.log(`Attempted to open WebSocket, but existing socket is ${this.getState()}`);return false}{const n=[...o,...this.consumer.subprotocols||[]];e.log(`Opening WebSocket, current state is ${this.getState()}, subprotocols: ${n}`);this.webSocket&&this.uninstallEventHandlers();this.webSocket=new t.WebSocket(this.consumer.url,n);this.installEventHandlers();this.monitor.start();return true}}close({allowReconnect:t}={allowReconnect:true}){t||this.monitor.stop();if(this.isOpen())return this.webSocket.close()}reopen(){e.log(`Reopening WebSocket, current state is ${this.getState()}`);if(!this.isActive())return this.open();try{return this.close()}catch(t){e.log("Failed to reopen WebSocket",t)}finally{e.log(`Reopening WebSocket in ${this.constructor.reopenDelay}ms`);setTimeout(this.open,this.constructor.reopenDelay)}}getProtocol(){if(this.webSocket)return this.webSocket.protocol}isOpen(){return this.isState("open")}isActive(){return this.isState("open","connecting")}triedToReconnect(){return this.monitor.reconnectAttempts>0}isProtocolSupported(){return r.call(s,this.getProtocol())>=0}isState(...t){return r.call(t,this.getState())>=0}getState(){if(this.webSocket)for(let e in t.WebSocket)if(t.WebSocket[e]===this.webSocket.readyState)return e.toLowerCase();return null}installEventHandlers(){for(let t in this.events){const e=this.events[t].bind(this);this.webSocket[`on${t}`]=e}}uninstallEventHandlers(){for(let t in this.events)this.webSocket[`on${t}`]=function(){}}}Connection.reopenDelay=500;Connection.prototype.events={message(t){if(!this.isProtocolSupported())return;const{identifier:n,message:o,reason:s,reconnect:r,type:c}=JSON.parse(t.data);this.monitor.recordMessage();switch(c){case i.welcome:this.triedToReconnect()&&(this.reconnectAttempted=true);this.monitor.recordConnect();return this.subscriptions.reload();case i.disconnect:e.log(`Disconnecting. Reason: ${s}`);return this.close({allowReconnect:r});case i.ping:return null;case i.confirmation:this.subscriptions.confirmSubscription(n);if(this.reconnectAttempted){this.reconnectAttempted=false;return this.subscriptions.notify(n,"connected",{reconnected:true})}return this.subscriptions.notify(n,"connected",{reconnected:false});case i.rejection:return this.subscriptions.reject(n);default:return this.subscriptions.notify(n,"received",o)}},open(){e.log(`WebSocket onopen event, using '${this.getProtocol()}' subprotocol`);this.disconnected=false;if(!this.isProtocolSupported()){e.log("Protocol is unsupported. Stopping monitor and disconnecting.");return this.close({allowReconnect:false})}},close(t){e.log("WebSocket onclose event");if(!this.disconnected){this.disconnected=true;this.monitor.recordDisconnect();return this.subscriptions.notifyAll("disconnected",{willAttemptReconnect:this.monitor.isRunning()})}},error(){e.log("WebSocket onerror event")}};const extend=function(t,e){if(e!=null)for(let n in e){const i=e[n];t[n]=i}return t};class Subscription{constructor(t,e={},n){this.consumer=t;this.identifier=JSON.stringify(e);extend(this,n)}perform(t,e={}){e.action=t;return this.send(e)}send(t){return this.consumer.send({command:"message",identifier:this.identifier,data:JSON.stringify(t)})}unsubscribe(){return this.consumer.subscriptions.remove(this)}}class SubscriptionGuarantor{constructor(t){this.subscriptions=t;this.pendingSubscriptions=[]}guarantee(t){if(this.pendingSubscriptions.indexOf(t)==-1){e.log(`SubscriptionGuarantor guaranteeing ${t.identifier}`);this.pendingSubscriptions.push(t)}else e.log(`SubscriptionGuarantor already guaranteeing ${t.identifier}`);this.startGuaranteeing()}forget(t){e.log(`SubscriptionGuarantor forgetting ${t.identifier}`);this.pendingSubscriptions=this.pendingSubscriptions.filter((e=>e!==t))}startGuaranteeing(){this.stopGuaranteeing();this.retrySubscribing()}stopGuaranteeing(){clearTimeout(this.retryTimeout)}retrySubscribing(){this.retryTimeout=setTimeout((()=>{this.subscriptions&&typeof this.subscriptions.subscribe==="function"&&this.pendingSubscriptions.map((t=>{e.log(`SubscriptionGuarantor resubscribing ${t.identifier}`);this.subscriptions.subscribe(t)}))}),500)}}class Subscriptions{constructor(t){this.consumer=t;this.guarantor=new SubscriptionGuarantor(this);this.subscriptions=[]}create(t,e){const n=t;const i=typeof n==="object"?n:{channel:n};const o=new Subscription(this.consumer,i,e);return this.add(o)}add(t){this.subscriptions.push(t);this.consumer.ensureActiveConnection();this.notify(t,"initialized");this.subscribe(t);return t}remove(t){this.forget(t);this.findAll(t.identifier).length||this.sendCommand(t,"unsubscribe");return t}reject(t){return this.findAll(t).map((t=>{this.forget(t);this.notify(t,"rejected");return t}))}forget(t){this.guarantor.forget(t);this.subscriptions=this.subscriptions.filter((e=>e!==t));return t}findAll(t){return this.subscriptions.filter((e=>e.identifier===t))}reload(){return this.subscriptions.map((t=>this.subscribe(t)))}notifyAll(t,...e){return this.subscriptions.map((n=>this.notify(n,t,...e)))}notify(t,e,...n){let i;i=typeof t==="string"?this.findAll(t):[t];return i.map((t=>typeof t[e]==="function"?t[e](...n):void 0))}subscribe(t){this.sendCommand(t,"subscribe")&&this.guarantor.guarantee(t)}confirmSubscription(t){e.log(`Subscription confirmed ${t}`);this.findAll(t).map((t=>this.guarantor.forget(t)))}sendCommand(t,e){const{identifier:n}=t;return this.consumer.send({command:e,identifier:n})}}class Consumer{constructor(t){this._url=t;this.subscriptions=new Subscriptions(this);this.connection=new Connection(this);this.subprotocols=[]}get url(){return createWebSocketURL(this._url)}send(t){return this.connection.send(t)}connect(){return this.connection.open()}disconnect(){return this.connection.close({allowReconnect:false})}ensureActiveConnection(){if(!this.connection.isActive())return this.connection.open()}addSubProtocol(t){this.subprotocols=[...this.subprotocols,t]}}function createWebSocketURL(t){typeof t==="function"&&(t=t());if(t&&!/^wss?:/i.test(t)){const e=document.createElement("a");e.href=t;e.href=e.href;e.protocol=e.protocol.replace("http","ws");return e.href}return t}function createConsumer(t=getConfig("url")||n.default_mount_path){return new Consumer(t)}function getConfig(t){const e=document.head.querySelector(`meta[name='action-cable-${t}']`);if(e)return e.getAttribute("content")}export{Connection,ConnectionMonitor,Consumer,n as INTERNAL,Subscription,SubscriptionGuarantor,Subscriptions,t as adapters,createConsumer,createWebSocketURL,getConfig,e as logger};

