# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "three" # @0.170.0
pin "three/examples", to: "https://ga.jspm.io/npm:three@0.143.0/examples/jsm/controls/OrbitControls.js"
