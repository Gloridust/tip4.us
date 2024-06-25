#!/usr/bin/env ruby

require 'yaml'

# 读取所有文章
posts = Dir.glob('_posts/*.*')

# 收集所有唯一的标签
tags = posts.flat_map do |post|
  front_matter = File.read(post).split('---')[1]
  YAML.load(front_matter)['tags']
end.compact.uniq

# 为每个标签创建一个页面
tags.each do |tag|
  File.open("_tags/#{tag}.md", 'w') do |file|
    file.puts "---"
    file.puts "layout: tag"
    file.puts "tag: #{tag}"
    file.puts "---"
  end
end

puts "Generated tag pages for: #{tags.join(', ')}"