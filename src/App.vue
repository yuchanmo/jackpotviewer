<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
      <v-list-item link :to='summarylink'>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>속보</v-list-item-title>
          </v-list-item-content>          
        </v-list-item>
        <v-list-item link :to='listlink'>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ITEM LIST</v-list-item-title>
          </v-list-item-content>          
        </v-list-item>
        <!-- <v-list-item link :to='trendlink'>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ITEM LIST with Trend</v-list-item-title>
          </v-list-item-content>          
        </v-list-item> -->
        <!-- <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>RAUMKOONG</v-toolbar-title>
    </v-app-bar>
    <v-container fluid>
    <v-row align="start">
      <v-main align="start">        
            <router-view></router-view>
      </v-main>
    </v-row>  
    </v-container>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },

    data: () => ({
      drawer: null,
      summarylink : '/',
      listlink : '/list',
      trendlink : '/trend',
    }),

    created () {
      this.$vuetify.theme.dark = true
      
    },
  }
</script>