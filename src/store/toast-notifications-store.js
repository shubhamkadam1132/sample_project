const initializeState = () => ({
  toast: {
    notifications: [],
    posX: "right", // left/right
    posY: "top", // top/bottom
    showCloseBtn: false
  }
});

export default () => ({
  state: initializeState(),
  mutations: {
    addToastNotificationsToState(state, payload) {
      if (payload && "id" in payload) {
        state.toast.notifications.push({
          id: payload.id || 1,
          text: payload.text || "Toast-notification",
          timer: payload.timer || 0,
          type: payload.type || "success",
          showCloseBtn: payload.closeBtn || !payload.timer || false
        });
      }
      if (payload && "posX" in payload) state.toast.posX = payload.posX;
      if (payload && "posY" in payload) state.toast.posY = payload.posY;
    },
    clearToastNotificationsState(state, Id) {
      const index = state.toast.notifications
        .map((x) => {
          return x.id;
        })
        .indexOf(Id);
      state.toast.notifications.splice(index, 1);
    }
  },
  actions: {
    toastNotificationsProp(context, payload) {
      context.commit("addToastNotificationsToState", payload);
    },
    addToastNotifications(context, payload) {
      payload.id = Math.floor(
        new Date().getTime() + Math.random() * 1000000000
      );
      context.commit("addToastNotificationsToState", payload);
      if (payload && "timer" in payload && payload.timer !== 0) {
        const tmout = setTimeout(() => {
          context.commit("clearToastNotificationsState", payload.id);
        }, payload.timer);
        return tmout;
      }
    },
    clearToastNotifications(context, Id) {
      context.commit("clearToastNotificationsState", Id);
    }
  },
  getters: {
    toast: (state) => state.toast
  }
});
