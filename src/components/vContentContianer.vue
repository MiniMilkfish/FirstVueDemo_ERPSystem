<script>
  import { defineComponent, h, resolveDynamicComponent } from "vue";

  export default defineComponent({
    render() {
      let path =
        this.$store.state.moduleMasterHeader.currentHeaderTabDashboardPageUrl;
      path = path && path.length > 0 ? path : "vNotFound";
      
      return h(resolveDynamicComponent(path));
    },
    beforeUpdate() {
      this.$router.replace("/");
    },
  });
</script>
