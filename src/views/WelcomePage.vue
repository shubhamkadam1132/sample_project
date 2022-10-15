<template>
  <div class="hello">
    <h2>Welcome to 'vue-toast-notifications'</h2>
    <div class="" style="display: flex; flex-direction: column; width: auto">
      <span style="margin: 16px">Select notification position</span>
      <div class="positions">
        <input
          hidden
          id="radio1"
          type="radio"
          name="radioGroup"
          @click="seToastProps('top', 'left')"
        />
        <label style="text-align: left" for="radio1">Top Left</label>
        <input
          hidden
          id="radio2"
          type="radio"
          name="radioGroup"
          @click="seToastProps('top', 'right')"
          checked
        />
        <label style="text-align: right" for="radio2">Top Right</label>
        <input
          hidden
          id="radio3"
          type="radio"
          name="radioGroup"
          @click="seToastProps('bottom', 'left')"
        />
        <label style="text-align: left" for="radio3">Bottom Left</label>
        <input
          hidden
          id="radio4"
          type="radio"
          name="radioGroup"
          @click="seToastProps('bottom', 'right')"
        />
        <label style="text-align: right" for="radio4">Bottom Right</label>
      </div>
      <div style="margin: 32px auto 16px auto">
        <input id="isCloseBtn" type="checkbox" />
        <label style="margin: 0 8px" for="isCloseBtn"
          >Show / hide close button</label
        >
      </div>
      <div class="select-dropdown">
        <label style="margin: 0 8px">Select notification duration</label>
        <select id="selectTimer">
          <option value="">No Timer</option>
          <option v-for="n in 5" :key="n" :value="n * 2000" :selected="n === 1">
            {{ n * 2 }} seconds
          </option>
        </select>
      </div>
      <span style="margin: 16px">Notification type</span>
      <div class="btns">
        <button class="green" @click="showToast('success')">Success</button>
        <button class="orange" @click="showToast('warning')">Warning</button>
        <button class="blue" @click="showToast('info')">Info</button>
        <button class="red" @click="showToast('error')">Error</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  methods: {
    seToastProps(posY, posX) {
      this.$store.dispatch("toastNotificationsProp", {
        posY,
        posX,
      });
    },
    showToast(type) {
      const closeBtn = document.getElementById("isCloseBtn").checked || false;
      const timer = document.getElementById("selectTimer").value || 0;
      console.log(timer);
      switch (type) {
        case "error":
          this.$store.dispatch("addToastNotifications", {
            text: "Oops...! Your toast notification is here",
            type,
            timer,
            closeBtn,
          });
          break;
        case "warning":
          this.$store.dispatch("addToastNotifications", {
            text: "Alert! Your toast notification is here",
            type,
            timer,
            closeBtn,
          });
          break;
        case "info":
          this.$store.dispatch("addToastNotifications", {
            text: "Fyi! Your toast notification is here",
            type,
            timer,
            closeBtn,
          });
          break;
        default:
          this.$store.dispatch("addToastNotifications", {
            text: "Congrats! Your toast notification is here",
            type,
            timer,
            closeBtn,
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  width: 80px;
  border-radius: 4px;
  padding: 8px 12px;
  border: none;
  color: white;
  margin: 8px auto;
  text-align: center;
  justify-content: space-between;
}
input[type="radio"]:checked + label {
  color: #000;
  font-weight: bold;
}
input,
button,
.positions > label {
  cursor: pointer;
}
.positions {
  width: 25%;
  margin: auto;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 2rem;
  gap: 4rem;
  border-color: #aaaaaa;
  border-width: 2px;
  border-style: dashed;
}
.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 40%;
  margin: auto;
}
@media screen and (max-width: 768px) {
  .positions {
    width: 66.6666%;
  }
  .btns {
    width: 75%;
  }
}
.select-dropdown {
  margin: auto;
  padding: 0;
  position: relative;
  box-sizing: border-box;
  position: relative;
  border-radius: 4px;
}
.select-dropdown select {
  font-size: 1rem;
  font-weight: normal;
  width: auto;
  padding: 8px 16px 8px 10px;
  border: 1px solid #aaaaaa;
  border-radius: 4px;
  cursor: pointer;
}
.select-dropdown select:active,
.select-dropdown select:focus {
  outline: none;
  box-shadow: none;
}
.green {
  background-color: #38a169;
}
.orange {
  background-color: #dd6b20;
}
.blue {
  background-color: #3182ce;
}
.red {
  background-color: #e53e3e;
}
</style>
