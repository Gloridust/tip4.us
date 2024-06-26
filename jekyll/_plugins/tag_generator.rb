Jekyll::Hooks.register :site, :after_init do |site|
  puts "Registered tags plugin"
end

module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      puts "Starting tag generation"
      tags = site.posts.docs.flat_map { |post| post.data['tags'] || [] }.uniq
      puts "Found tags: #{tags.join(', ')}"

      tags.each do |tag|
        puts "Generating page for tag: #{tag}"
        site.pages << TagPage.new(site, site.source, 'tags', tag)
      end
      puts "Finished tag generation"
    end
  end

  class TagPage < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = "#{tag.downcase}.html"

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      self.data['layout'] = 'tag'
      self.data['title'] = "Tag: #{tag}"
      self.data['tag'] = tag
      puts "Created tag page: #{@dir}/#{@name}"
    end
  end
end