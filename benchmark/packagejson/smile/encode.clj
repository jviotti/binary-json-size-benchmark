(ns smile-encode (:require [cheshire.core :refer :all]))
(def json (parse-string (slurp (System/getenv "JSON_FILE"))))
(def data (generate-smile json))
(with-open [w (clojure.java.io/output-stream
                (System/getenv "OUTPUT_FILE"))]
  (.write w data))
