module Jekyll
  module Images
    ##
    # Generates a the srcset attribute for a img tag
    # This assumes:
    # 1. image name doesn't have any dots aside from the one before the extension
    # 2. image has 2x and 3x versions that are named the same
    #
    # Example:
    #   {{ "/assets/img/some_image.png" | srcset }}
    #   will output:
    #   "/assets/img/some_image.png 1x, /assets/img/some_image@2x.png 2x, /assets/img/some_image@3x.png 3x"
    def srcset(image)
      splitted_name = image.split('.')
      image_name = splitted_name.first
      image_extension = splitted_name.last

      [
        "#{image_name}.#{image_extension} 1x",
        "#{image_name}@2x.#{image_extension} 2x",
        "#{image_name}@3x.#{image_extension} 3x"
      ].join(', ')
    end
  end
end

Liquid::Template.register_filter(Jekyll::Images)
