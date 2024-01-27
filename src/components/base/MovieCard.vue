<template>
  <v-card :loading="loading" class="movie-card">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <div class="movie-card__content">
      <div class="movie-card__header">
        <v-img
          contain
          class="movie-card__image"
          :src="image"
          :lazy-src="image"
          max-width="84"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-card-title>
          <h1>{{ title }}</h1>
        </v-card-title>
        <v-card-subtitle>
          <v-row align="center" no-gutters>
            <v-col cols="12" justify="center">
              <h4>{{ year }}, {{ director }}</h4>
            </v-col>
            <v-col cols="12" justify="center">
              <div class="movie-card__runtime">
                <v-chip class="minutes mr-2">
                  <v-icon class="pr-1" small>mdi-clock</v-icon>
                  {{ runtime }}
                </v-chip>
              </div>
              <v-chip
                v-for="(genre, index) in getGenres"
                :key="index"
                class="mr-2 movie-card__tags"
                color="green"
                text-color="white"
                small
              >
                <span>{{ genre }}</span>
              </v-chip>
            </v-col>
          </v-row>
        </v-card-subtitle>
      </div>
      <v-card-text class="movie-card__plot">
        <v-row>
          <v-col cols="auto">
            <p class="movie-card__plot-text">
              {{ plot }}
            </p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="movie-card__actions">
        <ul>
          <li>
            <v-btn
              icon
              @click="onFavorited()"
              :color="isFavorited ? 'red' : ''"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </li>
          <li v-if="isFavoritePage" class="ml-2">
            <div class="d-flex align-center">
              <v-rating
                v-model="stars"
                color="amber"
                dense
                hover
                background-color="grey"
                size="24"
                @input="onRated"
              ></v-rating>
              <span class="grey--text text--lighten-2 text-h4 ml-2">
                {{ stars }}
              </span>
            </div>
          </li>
        </ul>
      </v-card-actions>
    </div>
    <div class="blur-back" :style="backgroundStyle"></div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  VBtn,
  VCard,
  VCardActions,
  VCardSubtitle,
  VCardText,
  VCardTitle,
  VImg,
  VRating,
} from 'vuetify/lib';
import { mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
  components: {
    VCard,
    VImg,
    VCardTitle,
    VCardSubtitle,
    VCardText,
    VCardActions,
    VBtn,
    VRating,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    year: {
      type: String,
      required: false,
    },
    director: {
      type: String,
      required: false,
    },
    runtime: {
      type: String,
      required: false,
    },
    genre: {
      type: String,
      required: false,
    },
    plot: {
      type: String,
      required: false,
    },
    isFavorited: {
      type: Boolean,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  computed: {
    ...(mapGetters('favoriteMovies', ['getMovies']) as {
      getMovies: typeof Array<any>;
    }),
    getGenres(): string[] {
      return this.genre.split(',').map(genre => genre.trim());
    },
    backgroundStyle(): Record<string, string> {
      return {
        background: `url(${this.image})`,
      };
    },
  },
  data() {
    return {
      loading: false as Boolean,
      isFavoritePage: false as Boolean,
      stars: this.rating,
    };
  },
  created() {
    this.isFavoritePage = this.$route.name === 'favoriteMoviesView';
  },
  methods: {
    ...mapMutations('favoriteMovies', ['SET_MOVIES']),
    onFavorited(): void {
      this.$emit('favorited', this.id);
    },
    onRated(): void {
      this.$emit('rated', this.stars);
    },
  },
});
</script>

<style scoped lang="scss">
::v-deep.movie-card {
  position: relative;
  display: block;
  width: 100%;
  max-width: 800px;
  height: 450px;
  margin: 6rem auto;
  overflow: hidden;
  border-radius: 10px !important;
  transition: all 0.4s;
  box-shadow: 0px 0px 150px -45px rgba(19, 160, 134, 0.6) !important;
  &:hover {
    box-shadow: 0px 0px 120px -55px rgba(19, 160, 134, 0.6);
    transform: scale(1.02);
    transition: all 0.4s;
  }
  &__content {
    position: relative;
    width: 100%;
    height: 100%;
    background-blend-mode: multiply;
    z-index: 2;
    border-radius: 10px;
  }

  &__header {
    position: relative;
    padding: 25px;
    // height: 40%;
    height: fit-content;
    .v-card__title {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
    .v-card__subtitle {
      font-size: 0.813rem;
    }
    h1 {
      font-size: 1.5rem;
      color: #fff;
      font-weight: 800;
      word-break: break-word;
    }
    h4 {
      color: #9ac7fa;
      font-weight: 400;
      margin-bottom: 10px;
      margin-top: 0.25rem;
    }
    .minutes {
      display: inline-block;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.13);
      font-size: 0.813rem;
    }
    &__tags {
      display: inline-block;
      span {
        font-size: 0.75rem;
      }
    }
  }

  &__image {
    position: relative;
    float: left;
    margin-right: 20px;
    height: 120px;
    box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.5);
  }
  &__runtime {
    margin-bottom: 0.625rem;
    span {
      font-size: 0.75rem;
    }
  }
  &__plot {
    padding: 25px;
    height: 50%;
  }

  &__plot-text {
    color: #cfd6e1;
    font-size: 0.75rem;
  }

  &__actions {
    height: 10%;
    padding-left: 15px;
    padding-bottom: 20px;
    ul {
      list-style: none;
      padding: 0;
      li {
        display: inline-block;
        color: rgba(255, 255, 255, 0.4);
        transition: color 0.3s;
        transition-delay: 0.15s;
        margin: 0 10px;
        &:hover {
          transition: color 0.3s;
          color: rgba(255, 255, 255, 0.8);
        }
        i {
          font-size: 19px;
          cursor: pointer;
        }
      }
    }
  }
  .blur-back {
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%;
    right: 0;
    background-size: cover !important;
    border-radius: 11px;
    background: url('https://fsmedia.imgix.net/cd/c9/5e/ba/4817/4d9a/93f0/c776ec32ecbc/lara-crofts-neck-looks-unnatural-in-the-new-poster-for-tomb-raider.png');
  }
}

/* SM, MD, LG, XL */
@media screen and (min-width: 769px) {
  .movie-card {
    &__content {
      background: linear-gradient(to right, #0d0d0c 50%, transparent 100%);
    }
    &__header {
      width: 60%;
      height: 48%;
      .v-card__subtitle {
        padding: 0;
      }
    }
    &__image {
      height: 100%;
    }
    &__runtime {
      margin-bottom: 0.625rem;
    }
    &__plot {
      width: 50%;
      padding-top: 0;
      padding-bottom: 0;
      height: fit-content;
    }
    &__actions {
      position: absolute;
      bottom: 20px;
      padding: 0 0 0 25px;
      ul {
        li {
          margin: 0;
        }
      }
    }
    .blur-back {
      width: 80%;
      background-position: -100% 10% !important;
    }
  }
}
/* Mobile */
@media screen and (max-width: 768px) {
  ::v-deep.movie-card {
    width: 95%;
    margin: 70px auto;
    min-height: 350px;
    height: auto;
    &__content {
      background: linear-gradient(
        to top,
        rgb(20, 20, 19) 50%,
        transparent 100%
      );
      display: inline-grid;
    }
    .v-card__title {
      padding-top: 1rem;
      font-size: 0.875rem;
    }
    .v-card__subtitle {
      padding: 0;
      font-size: 0.813rem;
    }
    &__image {
      float: none;
      margin: auto;
    }
    &__header {
      width: 100%;
      margin-top: 85px;
    }
    &__plot {
      width: 100%;
      padding-top: 0 !important;
    }
    &__actions {
      display: flex;
      justify-content: center;
      padding: 0;
    }
    .blur-back {
      width: 100%;
      background-position: 50% 50% !important;
      height: 50%;
    }
  }
}
</style>
