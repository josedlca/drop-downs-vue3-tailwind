<template>
        <div class="sm:w-1/3 w-2/4">
            <div class="mx-1 relative mb-3 ">
                <!-- boton -->
                <button                 
                    class="focus-vi group px-3 w-full text-left flex justify-between items-center py-2 rounded-sm cursor-pointer font-sans font-semibold text-cm-dark-gray transition duration-200 ease-in-out" 
                    :class="{'bg-white': isDisabled, 'bg-purple-300 hover:bg-lila hover:text-white ': !isDisabled}"
                    @click="isOpen = !isOpen" 
                    @keydown.esc="close"
                    :disabled = "isDisabled"
                    type="button">
                    <!-- name and number -->
                    <div>
                        <span v-if= "selectedCount > 0">
                            {{ selectedCount }} 
                        </span>
                        {{ title }}
                    </div>
                    <!-- name and number end-->
                    <!-- svg icon -->
                    <svg 
                        :class="{'group-hover:text-white':!isDisabled}"
                        class="fill-current text-lila " width="17" height="17" viewBox="0 0 24 24"
                    >
                        <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/>
                    </svg>
                    <!-- svg icon end-->
                </button>  
                <!-- fin boton -->
                <!-- combo box -->
                <transition name = "fade">
                    <ul class=" bg-white border-t-2 border-gray-300 absolute top-full w-full z-10" 
                        v-show="isOpen" @change="updateSomething">
                        <li class="group checkbox py-1 px-3 pr-6 hover:bg-lila transition duration-200 ease-in-out" 
                            v-for="(option, index) in options" :key="tempItemId(index)"
                        >
                            <label class="group-hover:text-white font-sans block font-semibold text-gray-600" 
                                :for="tempItemId(index)"
                            >
                                {{ option }}
                                <input type="checkbox" :id="tempItemId(index)" :value="option" v-model="selected">
                                <!-- custom checkbox -->
                                <span class="check"></span>
                                <!-- custom checkbox -->
                            </label>                    
                        </li>
                    </ul>
                </transition>  
                <!-- combo box -->
            </div>
        </div>
</template>

<script>
import {v4 as uuidv4} from "uuid"

export default {
    props: {
        'label': {
            type: String,
            required: true
        },
        'options': {
            type: Array,
            required: true
        },
        'lastEnabled':{
            type: String,
            required: true
        }
    },
    mounted(){
        this.uuid = uuidv4();
        const listener = e => {
        if (e.target === this.$el || this.$el.contains(e.target)) {
            return
        }
            this.close()
        }
        document.addEventListener("click", listener)
    },
    data() {
        return {
            isOpen: false,
            selected: [],
            uuid: null,
            keepEnabled: false
        }
    },
    methods: {
        open() {
            this.isOpen = true
        },
        close(){
            this.isOpen = false
        },
        tempItemId(index){
            return `${index}_${this.uuid}`
        },
        // enabled elements method
        updateSomething(event){
            if(this.selectedCount > 0){
                this.$emit('enableNext', this.label)
                this.keepEnabled = true
            }else{
                this.$emit('disable')
            }
        }
    },
    computed: {
        selectedCount() {
            return this.selected.length
        },
        title() {
            return this.selectedCount > 1 ? `${this.label}s` : this.label
        },
        isDisabled(){
            if(this.keepEnabled) return false
            return this.label !== this.lastEnabled
        }
    }
}
</script>

<style scoped>
/* combo box animacion */
.fade-enter-active, .fade-leave-active {
  transition: opacity ease .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
/* combo box animacion */
.checkbox {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* hide the browser's default checkbox */
.checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

/* create custom checkbox */
.check {
    position: absolute;
    top: 50%;
    right: 0.75rem;
    transform: translateY(-50%);
    height: 20px;
    width: 20px;
    background-color: #ffffff;
    border: 2px solid rgba(113,42,232,255);
    border-radius: 4px;
}

/* on mouse-over, add border color */
.checkbox:hover input ~ .check {
    border: 2px solid rgba(113,42,232,255);
}

/* add background color when the checkbox is checked */
.checkbox input:checked ~ .check {
    background-color: rgba(113,42,232,255);
    border:none;
}

/* create the checkmark and hide when not checked */
.check:after {
    content: "";
    position: absolute;
    display: none;
}

/* show the checkmark when checked */
.checkbox input:checked ~ .check:after {
    display: block;
}

/* checkmark style */
.checkbox .check:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
/* focus visible styles */
.focus-vi:focus-visible{
    outline: 2px solid rgba(113,42,232,255);
    border-radius: 5px;
}
</style>