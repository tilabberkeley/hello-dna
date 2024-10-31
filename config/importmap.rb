# Pin npm packages by running ./bin/importmap

pin "application"
pin "three" # @0.169.0
pin "@hotwired/turbo-rails", to: "@hotwired--turbo-rails.js" # @8.0.12
pin "bootstrap" # @5.3.3
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "three", to: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
pin "GLTFLoader", to: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/jsm/loaders/GLTFLoader.js"
pin "three_model", to: "three_model.js"
pin "application", to: "application.js"
pin "@hotwired/turbo", to: "@hotwired--turbo.js" # @8.0.12
pin "@rails/actioncable/src", to: "@rails--actioncable--src.js" # @7.2.102
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@popperjs/core", to: "@popperjs--core.js" # @2.11.8
