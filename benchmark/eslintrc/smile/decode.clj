(ns smile-decode (:require [cheshire.core :refer :all]))

; See https://stackoverflow.com/a/26372677
(defn slurp-bytes
  "Slurp the bytes from a slurpable thing"
  [x]
  (with-open [out (java.io.ByteArrayOutputStream.)]
    (clojure.java.io/copy (clojure.java.io/input-stream x) out)
    (.toByteArray out)))

(def data (slurp-bytes (System/getenv "INPUT_FILE")))
(def result (generate-string (parse-smile data) {:pretty true}))
(println result)
