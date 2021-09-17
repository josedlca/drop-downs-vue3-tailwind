<template>
  <div id="app" class="w-full flex flex-row justify-center py-24">
    <div class="w-full sm:w-9/12 md:w-7/12 lg:w-8/12 xl:w-6/12 max-h-full py-3 bg-cm-light-gray inline-flex flex-row flex-wrap">
      <Dropdown 
        v-for="(item, index) in BackendData"
        :key="index"
        :label="item.title"
        :options="item.options"
        :lastEnabled="current"
        @enableNext="enableNext"
      />
    </div>
  </div>
</template>

<script>
import Dropdown from "./components/Dropdown.vue";
export default {
  name: "App",
  components: {
    Dropdown,
  },
  data() {
    return {
      current: "Audiencia",
      BackendData: [
        {
          title: "Audiencia",
          disabled: false,
          options: ["Docentes", "Estudiantes", "Egresados", "Administrativos"],
        },
        {
          title: "Sede",
          options: ["Pueblo Libre", "Ica", "Iquitos", "Surco"],
        },
        {
          title: "Division",
          options: ["Carreras Profesionales"],
        },
        {
          title: "Programa",
          options: ["Carreras Tecnicas", "Escuela"],
        },
        {
          title: "Periodo",
          options: ["2020-II", "2021-I", "2021-II"],
        },
        {
          title: "Carrera",
          options: [
            "Marketing",
            "Administración de Empresas",
            "Ciencias Publicitarias",
          ],
        },
        {
          title: "Ciclo",
          options: ["I Ciclo", "II Ciclo"],
        },
      ],
    };
  },
  methods: {
    enableNext(title) {
      const index = this.sortedDropdownsTitles.indexOf(title);
		
      if (this.sortedDropdownsTitles.length > index + 1) {
        this.current = this.sortedDropdownsTitles[index + 1];
      }
    },
  },
  computed: {
    sortedDropdownsTitles() {
      return this.BackendData.map((item) => item.title);
    },
  },
};
</script>

<style>
</style>