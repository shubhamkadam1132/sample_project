<template>
  <section class="toast-notification-component slim-toast-notification-active">
    <div
      :class="{ active: toast.notifications.length }"
      class="floated-chat-w"
      :style="`${toast.posX}: 0; ${toast.posY}: 0;`"
    >
      <section class="slim-toast-notification">
        <transition-group
          name="list"
          tag="div"
          :style="`display: flex; flex-direction: column; align-items: ${
            toast.posX === 'left' ? 'start' : 'end'
          }`"
        >
          <div
            v-for="(notification, index) in toast.notifications"
            :key="index + 1"
            style="max-width: 400px"
          >
            <div
              :key="index"
              class="toast-body"
              :class="getNotificationColor(notification.type).all"
            >
              <div style="display: flex">
                <span class="px-6 py-4" style="padding: 16px 0 16px 24px">{{
                  notification.text
                }}</span>
                <div style="margin: auto 12px; display: flex; cursor: pointer">
                  <svg
                    v-if="notification.showCloseBtn"
                    @click="clearToastNotifications(notification.id)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
              </div>
              <div class="progress">
                <div
                  class="progress-value"
                  :class="getNotificationColor(notification.type).progress"
                  :style="`animation-duration: ${
                    notification.timer || 0.001
                  }ms;`"
                />
              </div>
            </div>
          </div>
        </transition-group>
      </section>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "StoreToastNotification",
  computed: {
    ...mapGetters(["toast"]),
  },
  methods: {
    ...mapActions(["clearToastNotifications"]),
    getNotificationColor(type) {
      let all;
      let progress;
      switch (type) {
        case "error":
          all = "bg-red-200 text-red-600 border-red-300";
          progress = "bg-red-300";
          break;
        case "warning":
          all = "bg-orange-200 text-orange-600 border-orange-300";
          progress = "bg-orange-300";
          break;
        case "info":
          all = "bg-blue-200 text-blue-600 border-blue-300";
          progress = "bg-blue-300";
          break;
        default:
          all = "bg-green-200 text-green-600 border-green-300";
          progress = "bg-green-300";
      }
      return { all, progress };
    },
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: transform 0.2s, opacity 0.2s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
.toast-notification-component {
  z-index: 9999999;
  position: relative;
}
.slim-toast-notification-active .floated-chat-w {
  width: auto;
  margin: 16px;
  position: fixed;
  line-height: 1.2rem;
  /* transform: translate(-8%, -20px); */
}
/* .toast-notification-component.slim-toast-notification-active
  .floated-chat-w.active {
  transform: translate(-8%, 0);
} */
.toast-body {
  margin-bottom: 8px;
  text-align: left;
  border-radius: 0.25rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
  border-width: 1px;
}
/* progressbar css */
.progress {
  background: rgba(255, 255, 255, 0.1);
  border-bottom-right-radius: 9999px;
  border-bottom-left-radius: 9999px;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  display: flex;
  height: 4px;
  width: 100%;
}

.progress-value {
  box-shadow: 0 10px 40px -10px #fff;
  animation: load normal forwards;
  /* animation-duration: 1s; */
  height: 4px;
  width: 0;
}

@keyframes load {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

svg {
  margin: auto;
}
/* toast colours */
.text-red-600 {
  color: #e53e3e;
}
.bg-red-200 {
  background-color: #fed7d7;
}
.bg-red-300 {
  background-color: #feb2b2;
}
.border-red-300 {
  border-color: #feb2b2;
}
.text-green-600 {
  color: #38a169;
}
.bg-green-200 {
  background-color: #c6f6d5;
}
.bg-green-300 {
  background-color: #9ae6b4;
}
.border-green-300 {
  border-color: #9ae6b4;
}
.text-orange-600 {
  color: #dd6b20;
}
.bg-orange-200 {
  background-color: #feebc8;
}
.bg-orange-300 {
  background-color: #fbd38d;
}
.border-orange-300 {
  border-color: #fbd38d;
}
.text-blue-600 {
  color: #3182ce;
}
.bg-blue-200 {
  background-color: #bee3f8;
}
.bg-blue-300 {
  background-color: #90cdf4;
}
.border-blue-300 {
  border-color: #90cdf4;
}
</style>
