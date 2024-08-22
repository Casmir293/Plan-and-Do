<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";

const props = defineProps({
  isAddTask: {
    type: Boolean,
    default: false,
  },
  isEditTask: {
    type: Boolean,
    default: false,
  },
  task: {
    type: Object as () => TaskDataForm,
    default: () => ({}),
  },
});

const dialog = ref(false);

const form = reactive<TaskDataForm>({
  title: "",
  description: "",
  priority: "",
  status: "",
  due_date: null,
});

watch(dialog, (newVal) => {
  if (newVal && props.isEditTask && props.task) {
    Object.assign(form, {
      title: props.task?.title,
      description: props.task?.description,
      priority: props.task?.priority,
      status: props.task?.status,
      due_date: props.task?.due_date,
    });
  }
});

const rules = reactive({
  title: (v: string) => !!v || "Title is required",
  description: (v: string) => !!v || "Description is required",
  priority: (v: string) => !!v || "Priority is required",
  status: (v: string) => !!v || "Status is required",
  date: (v: string) => !!v || "Due date is required",
});

const activatorContent = computed(() => {
  if (props.isAddTask) {
    return {
      component: "v-btn",
      props: {
        text: "New Task",
        prependIcon: "mdi-plus",
        class: "text-none font-weight-regular",
        variant: "tonal",
      },
    };
  } else if (props.isEditTask) {
    return {
      component: "v-icon",
      props: {
        icon: "mdi-pencil-outline",
        class: "cursor-pointer",
      },
    };
  }
  return {
    component: null,
    props: {},
  };
});
</script>

<template>
  <section>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <component
          v-if="activatorContent.component"
          :is="activatorContent.component"
          v-bind="{ ...activatorProps, ...activatorContent.props }"
        ></component>
      </template>

      <v-card prepend-icon="mdi-note-edit-outline" title="Schedule Task">
        <v-form fast-fail @submit.prevent>
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  label="Title*"
                  v-model="form.title"
                  :rules="[rules.title]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description*"
                  v-model="form.description"
                  :rules="[rules.description]"
                  clearable
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-select
                  :items="['low', 'medium', 'high']"
                  label="Priority*"
                  v-model="form.priority"
                  :rules="[rules.priority]"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-select
                  :items="['pending', 'In progress', 'Done']"
                  label="Status*"
                  v-model="form.status"
                  :rules="[rules.status]"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="4" sm="6">
                <v-date-input
                  label="Due date*"
                  v-model="form.due_date"
                  :rules="[rules.date]"
                  prepend-icon=""
                  prepend-inner-icon="$calendar"
                ></v-date-input>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis"
              >*indicates required field</small
            >
          </v-card-text>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>
          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>
